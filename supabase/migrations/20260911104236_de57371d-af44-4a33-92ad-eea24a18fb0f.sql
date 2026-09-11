REVOKE SELECT ON public.reviews FROM anon, authenticated;
GRANT SELECT (id, name, rating, comment, is_anonymous, is_approved, created_at) ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;

DROP POLICY IF EXISTS "No direct select on reviews table" ON public.reviews;
DROP POLICY IF EXISTS "Only approved reviews are visible" ON public.reviews;

CREATE POLICY "Only approved reviews are publicly visible"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (is_approved = true);