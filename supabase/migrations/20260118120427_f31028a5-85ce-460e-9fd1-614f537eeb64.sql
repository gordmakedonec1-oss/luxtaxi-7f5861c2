-- Fix cleanup function: Add access control check and set search_path properly
CREATE OR REPLACE FUNCTION public.cleanup_old_contact_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  calling_role TEXT;
BEGIN
  -- Only allow service_role to call this function
  calling_role := current_setting('request.jwt.claims', true)::json->>'role';
  
  IF calling_role IS NULL OR calling_role != 'service_role' THEN
    RAISE EXCEPTION 'Access denied: This function can only be called by service role';
  END IF;
  
  DELETE FROM public.contact_form_log 
  WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$;

-- Revoke execute permission from public roles
REVOKE EXECUTE ON FUNCTION public.cleanup_old_contact_logs() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_contact_logs() FROM anon;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_contact_logs() FROM authenticated;