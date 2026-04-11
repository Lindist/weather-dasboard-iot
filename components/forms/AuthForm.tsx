"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";
import OAuthForm from "./OAuthForm";

export function AuthForm() {
  return (
    <div className="w-full space-y-6 rounded-3xl border border-slate-700 bg-slate-950/80 p-6 shadow-xl backdrop-blur-sm transition-colors duration-200 hover:border-slate-500 hover:bg-slate-900/90">
      <Tabs defaultValue="signin" className="flex w-full flex-col gap-4">
        <TabsList className="grid h-10 w-full grid-cols-2 rounded-2xl border border-slate-700 bg-slate-900 p-1">
          <TabsTrigger
            value="signin"
            className="rounded-xl text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100 data-active:bg-slate-200 data-active:text-slate-900 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="rounded-xl text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100 data-active:bg-slate-200 data-active:text-slate-900 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin" className="w-full">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register" className="w-full">
          <RegisterForm />
        </TabsContent>
      </Tabs>
      <div className="flex items-center justify-center rounded-lg bg-slate-900/80 py-1.5 text-xs uppercase tracking-wider text-slate-300">
        or continue with
      </div>
      <OAuthForm />
    </div>
  );
}