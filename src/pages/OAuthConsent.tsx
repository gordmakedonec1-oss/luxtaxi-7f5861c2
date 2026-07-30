import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Shield, AlertCircle } from "lucide-react";

interface AuthorizationDetails {
  client?: { name?: string } | null;
  redirect_url?: string;
  redirect_to?: string;
  scope?: string;
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");

      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }

      const { data, error } = await (supabase.auth as any).oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);

      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }

      setDetails(data);
    })();

    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const oauth = (supabase.auth as any).oauth;
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);

    if (error) {
      setBusy(false);
      return setError(error.message);
    }

    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }

    window.location.href = target;
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">Authorization Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  const clientName = details.client?.name ?? "an app";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-light to-background px-4">
      <div className="max-w-md w-full luxury-card p-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6">
          <Shield className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-2xl font-serif font-semibold text-foreground text-center mb-2">
          Connect {clientName}
        </h1>
        <p className="text-muted-foreground text-center mb-6">
          This lets {clientName} use LuxTaxi Balkan Journeys as you.
        </p>

        {details.scope && (
          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Requested access:</p>
            <p className="text-foreground font-medium">{details.scope}</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mb-6">
          This does not bypass LuxTaxi&apos;s permissions or backend policies.
        </p>

        <div className="flex gap-3">
          <Button
            variant="gold-outline"
            size="lg"
            className="flex-1"
            disabled={busy}
            onClick={() => decide(false)}
          >
            Deny
          </Button>
          <Button
            variant="gold"
            size="lg"
            className="flex-1"
            disabled={busy}
            onClick={() => decide(true)}
          >
            {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : "Approve"}
          </Button>
        </div>
      </div>
    </main>
  );
}
