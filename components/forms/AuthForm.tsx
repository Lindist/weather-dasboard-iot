"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";
import OAuthForm from "./OAuthForm";

export function AuthForm() {
  return (
    <div
      className="w-full space-y-6 rounded-2xl border border-slate-600/60 bg-slate-950/90 p-7 text-slate-100 shadow-lg shadow-slate-950/20 backdrop-blur-sm transition-colors duration-200 hover:border-slate-500/80 [&_input]:h-10 [&_input]:rounded-lg [&_input]:border-slate-600 [&_input]:bg-slate-900/80 [&_input]:text-slate-100 [&_input]:placeholder:text-slate-400 [&_input]:focus-visible:border-slate-400 [&_input]:focus-visible:ring-slate-400/30 **:data-[slot=field-label]:text-slate-200"
    >
      <Tabs defaultValue="signin" className="flex w-full flex-col gap-5">
        <TabsList className="flex h-11 w-full items-stretch gap-1 rounded-lg border border-slate-700/80 bg-slate-900/90 p-1">
          <TabsTrigger
            value="signin"
            className="h-full min-h-0 flex-1 basis-0 rounded-md px-3 text-sm font-medium text-slate-400 shadow-none transition-colors hover:bg-slate-800/70 hover:text-slate-100 data-active:bg-slate-100 data-active:text-slate-900 data-active:hover:bg-slate-100 data-active:hover:text-slate-900 dark:hover:text-slate-100 dark:data-active:bg-slate-100 dark:data-active:text-slate-900 dark:data-active:hover:bg-slate-100 dark:data-active:hover:text-slate-900"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="h-full min-h-0 flex-1 basis-0 rounded-md px-3 text-sm font-medium text-slate-400 shadow-none transition-colors hover:bg-slate-800/70 hover:text-slate-100 data-active:bg-slate-100 data-active:text-slate-900 data-active:hover:bg-slate-100 data-active:hover:text-slate-900 dark:hover:text-slate-100 dark:data-active:bg-slate-100 dark:data-active:text-slate-900 dark:data-active:hover:bg-slate-100 dark:data-active:hover:text-slate-900"
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin" className="mt-0 w-full">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register" className="mt-0 w-full">
          <RegisterForm />
        </TabsContent>
      </Tabs>
      <div
        className="flex items-center gap-3 py-1"
        role="separator"
        aria-label="Or continue with social login"
      >
        <span className="h-px flex-1 bg-slate-700/90" aria-hidden />
        <span className="shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-slate-500">
          or continue with
        </span>
        <span className="h-px flex-1 bg-slate-700/90" aria-hidden />
      </div>
      <OAuthForm />
    </div>
  );
}