-- Create a public view that excludes sensitive email column
CREATE VIEW public.public_reviews 
WITH (security_invoker = on) AS
SELECT 
  id, 
  CASE WHEN is_anonymous THEN NULL ELSE name END as name,
  rating, 
  comment, 
  created_at
FROM public.reviews
WHERE is_approved = true;

-- Grant access to the view for public and authenticated users
GRANT SELECT ON public.public_reviews TO anon, authenticated;

-- Drop the existing SELECT policy that exposes all columns
DROP POLICY "Only approved reviews are visible" ON public.reviews;

-- Create a restrictive SELECT policy that denies direct table access
-- All public reads should go through the public_reviews view
CREATE POLICY "No direct select on reviews table"
ON public.reviews
FOR SELECT
USING (false);