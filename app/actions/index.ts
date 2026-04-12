"use server";

import type { Session, User } from "@supabase/supabase-js";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type AuthActionFailure = { success: false; error: string };
export type AuthActionSuccess<T> = { success: true; data: T };

const formatZodError = (error: z.ZodError): string =>
  error.issues.map((issue) => issue.message).join(", ");

export const signUpWithEmailAndPassword = async (
  rawInput: unknown
): Promise<
  AuthActionFailure | AuthActionSuccess<{ user: User | null; session: Session | null }>
> => {
  const parsed = credentialsSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: formatZodError(parsed.error) };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: { user: data.user, session: data.session },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign up failed.";
    return { success: false, error: message };
  }
};

export const signInWithEmailAndPassword = async (
  rawInput: unknown
): Promise<
  AuthActionFailure | AuthActionSuccess<{ user: User; session: Session }>
> => {
  const parsed = credentialsSchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: formatZodError(parsed.error) };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user || !data.session) {
      return { success: false, error: "Invalid sign-in response." };
    }

    return {
      success: true,
      data: { user: data.user, session: data.session },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign in failed.";
    return { success: false, error: message };
  }
};

export const signOut = async (): Promise<void> => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/auth");
};

export const readUserSession = async (): Promise<
  AuthActionFailure | AuthActionSuccess<{ user: User | null }>
> => {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: { user } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not read session.";
    return { success: false, error: message };
  }
};

export const readSetting = async (): Promise<
  AuthActionFailure | AuthActionSuccess<{ setting: any | null }>
> => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("settings").select("*");
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data) {
      return { success: false, error: "No setting found." };
    }
    return { success: true, data: { setting: data[0] } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not read setting.";
    return { success: false, error: message };
  }
};
