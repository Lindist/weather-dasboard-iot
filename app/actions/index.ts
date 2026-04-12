"use server";

import type { Session, User } from "@supabase/supabase-js";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SettingRow } from "@/types/settings";
import { redirect } from "next/navigation";
import { revalidatePath,unstable_noStore as noStore } from "next/cache";

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

export async function createSetting(data: {
  entityType: string;
  entityId: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("settings")
    .insert({
      entityType: data.entityType,
      entityId: data.entityId
    })
    .single();
  
    revalidatePath("/")
  return result;
}

export const readSetting = async (): Promise<
  AuthActionFailure | AuthActionSuccess<{ setting: SettingRow | null }>
> => {
  try {
    noStore();
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("settings").select("*").order("created_at", { ascending: false }).limit(1);
    if (error) {
      return { success: false, error: error.message };
    }
    const rows = data as SettingRow[] | null;
    if (!rows?.length) {
      return { success: false, error: "No setting found." };
    }
    return { success: true, data: { setting: rows[0] } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not read setting.";
    return { success: false, error: message };
  }
};
