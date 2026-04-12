"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  // React 19 warns when a client-rendered <script> is treated as executable.
  // SSR still emits the real blocking script; on the client, mark it as JSON so
  // React stops treating it as an executable script (see next-themes#387).
  const themeScriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={themeScriptProps}
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
};
