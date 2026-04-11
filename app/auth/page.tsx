import React from "react";
import { AuthForm } from "../../components/forms/AuthForm";
// import readUserSession from "@/actions";
import { Icons } from "@/components/icons";

export default async function page() {
  // const { data } = await readUserSession();
  // if (data.session) {
  //   return redirect("/");
  // }
  return (
    <div className="container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-linear-to-t from-[#111627] to-[#344378]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.sunset className="h-20 w-20" />
          Weather Station
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Get real-time weather updates on the go with our portable
              station, making it easy to stay informed and adjust to changing
              conditions wherever you are.&rdquo;
            </p>
            <footer className="pt-3 text-sm">Made with ♡ by Mirutec</footer>
          </blockquote>
        </div>
      </div>
      <div className="w-full p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-[540px] flex-col gap-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
            <p className="text-sm text-muted-foreground">
              Please enter your credentials to log in. New here? You can also
              register.
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
