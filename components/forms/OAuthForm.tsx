"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "sonner";

import { createSupabaseClientClient } from "@/lib/supabase/client";

export async function signInWithOAuthGitHub() {
  const supabase = createSupabaseClientClient();
  return supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export default function OAuthForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function loginWithGithub() {
    setIsLoading(true);
    try {
      const { data, error } = await signInWithOAuthGitHub();

      if (error) {
        toast.error("GitHub sign in failed", {
          description: error.message,
          duration: 6500,
        });
        setIsLoading(false);
        return;
      }

      if (data.url) {
        window.location.assign(data.url);
        return;
      }

      toast.error("GitHub sign in failed", {
        description:
          "No redirect URL returned. Check GitHub provider settings in Supabase.",
        duration: 6500,
      });
      setIsLoading(false);
    } catch {
      toast.error("GitHub sign in failed", {
        description: "Something went wrong. Please try again.",
        duration: 6500,
      });
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      className="h-10 w-full rounded-lg border-slate-600 bg-transparent text-slate-100! transition-colors hover:border-slate-500 hover:bg-slate-800/60"
      disabled={isLoading}
      aria-busy={isLoading}
      onClick={loginWithGithub}
    >
      Continue with GitHub
      <Icons.gitHub className="ml-2 h-4 w-4" />
    </Button>
  );
}
