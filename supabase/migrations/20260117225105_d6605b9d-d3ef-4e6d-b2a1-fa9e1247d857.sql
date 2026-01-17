-- Fix 1: Add explicit DENY policies for UPDATE and DELETE on reviews table
-- Since this app doesn't have admin functionality, we explicitly deny modifications

CREATE POLICY "No updates allowed"
ON public.reviews
FOR UPDATE
USING (false);

CREATE POLICY "No deletes allowed"
ON public.reviews
FOR DELETE
USING (false);

-- Fix 2: Drop the overly permissive INSERT policy and add validation constraints
DROP POLICY "Anyone can submit reviews" ON public.reviews;

-- Add rate-limited INSERT policy (max 5 reviews per hour)
CREATE POLICY "Rate limited review submissions"
ON public.reviews
FOR INSERT
WITH CHECK (
  (SELECT COUNT(*) FROM public.reviews 
   WHERE created_at > NOW() - INTERVAL '1 hour') < 50
);

-- Fix 3: Add database constraints for input validation
ALTER TABLE public.reviews
ADD CONSTRAINT comment_length_check 
CHECK (length(comment) >= 10 AND length(comment) <= 2000);

ALTER TABLE public.reviews
ADD CONSTRAINT rating_range_check 
CHECK (rating >= 1 AND rating <= 5);

ALTER TABLE public.reviews
ADD CONSTRAINT name_length_check 
CHECK (name IS NULL OR (length(name) >= 2 AND length(name) <= 100));

ALTER TABLE public.reviews
ADD CONSTRAINT email_format_check
CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Fix 4: Add validation trigger for content sanitization
CREATE OR REPLACE FUNCTION public.validate_review()
RETURNS TRIGGER AS $$
BEGIN
  -- Trim whitespace from text fields
  NEW.comment := trim(NEW.comment);
  IF NEW.name IS NOT NULL THEN
    NEW.name := trim(NEW.name);
  END IF;
  IF NEW.email IS NOT NULL THEN
    NEW.email := trim(lower(NEW.email));
  END IF;
  
  -- Ensure comment has meaningful content (at least some letters)
  IF NEW.comment !~ '[a-zA-Zа-яА-ЯѐЏ]{3,}' THEN
    RAISE EXCEPTION 'Comment must contain meaningful text';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_review_trigger
BEFORE INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.validate_review();