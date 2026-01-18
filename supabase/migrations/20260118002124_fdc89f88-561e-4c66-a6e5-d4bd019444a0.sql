-- Create table to log contact form submissions for rate limiting
CREATE TABLE public.contact_form_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for efficient rate limiting queries
CREATE INDEX idx_contact_form_log_ip_time ON public.contact_form_log(ip_address, created_at);

-- Enable RLS
ALTER TABLE public.contact_form_log ENABLE ROW LEVEL SECURITY;

-- No public access - only service role can access (used by edge function)
-- No policies needed since we use service role key in edge function

-- Add cleanup function to remove old entries (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_contact_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM public.contact_form_log 
  WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;