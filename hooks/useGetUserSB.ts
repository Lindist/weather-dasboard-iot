'use client'
import { useEffect, useState } from 'react';
import type { Session } from "@supabase/supabase-js";
import { createSupabaseClientClient } from "@/lib/supabase/client";

export async function readUserSession() {
  const supabase = createSupabaseClientClient();
  return supabase.auth.getSession();
}

export function useGetUserSB() {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { error, data } = await readUserSession();
        if (error) {
          setError(error.message);
          return;
        }
        setSession(data.session);
      } catch (err) { 
        const message = err instanceof Error ? err.message : "Failed to read session.";
        setError(message);
      }
    };

    fetchData();

  }, []);

  return { session, error };
}
