"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
// import { toast } from "sonner";

// import createSupabaseClientClient from "@/lib/supabase/client";

// export async function signInWithOAuthGitHub() {
  // const supabase = await createSupabaseClientClient();
  // const result = await supabase.auth.signInWithOAuth({
  //   provider: "github",
  //   options: {
  //     redirectTo: `${location.origin}/auth/callback`,
  //   },
  // });
  // return result;
// }

export default function OAuthForm() {
  async function loginWithGithub() {
    console.log("loginWithGithub");
    // const result = await signInWithOAuthGitHub();
    // const { error } = result;

    // if (error?.message) {
    //   console.log(error.message);
    //   toast({
    //     variant: "destructive",
    //     title: "You submitted the following values:",
    //     description: (
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">{error.message}</code>
    //       </pre>
    //     ),
    //   });
    // } else {
    //   console.log("succes");
    //   toast({
    //     title: "You submitted the following values:",
    //     description: (
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">Successfully Login</code>
    //       </pre>
    //     ),
    //   });
    // }
  }

  return (
    <Button
      variant="outline"
      className="h-10 w-full rounded-xl border-slate-600 bg-slate-800/80 text-slate-100 transition-colors hover:bg-slate-700"
      onClick={loginWithGithub}
    >
      Continue with GitHub
      <Icons.gitHub className="ml-2 h-4 w-4" />
    </Button>
  );
}
