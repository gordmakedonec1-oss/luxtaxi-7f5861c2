-- Add explicit deny policies to contact_form_log for defense-in-depth
-- RLS is already enabled, these policies make the intent explicit

-- Deny all SELECT access
CREATE POLICY "No public SELECT on contact_form_log"
ON public.contact_form_log FOR SELECT
USING (false);

-- Deny all INSERT access (service role bypasses this)
CREATE POLICY "No public INSERT on contact_form_log"
ON public.contact_form_log FOR INSERT
WITH CHECK (false);

-- Deny all UPDATE access
CREATE POLICY "No public UPDATE on contact_form_log"
ON public.contact_form_log FOR UPDATE
USING (false);

-- Deny all DELETE access
CREATE POLICY "No public DELETE on contact_form_log"
ON public.contact_form_log FOR DELETE
USING (false);