-- Add documentation comment to rate_limits table
-- This table is used exclusively by edge functions with service role access
-- and does not require user-facing RLS policies
COMMENT ON TABLE public.rate_limits IS 'Internal table for rate limiting edge function requests. Access is restricted to service role only. RLS is enabled but no policies are needed as this table is never accessed by authenticated users.';