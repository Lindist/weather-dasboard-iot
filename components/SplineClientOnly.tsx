"use client";

import dynamic from "next/dynamic";

const SplineComponent = dynamic(() => import("@/components/SplineComponent"), {
  ssr: false,
});

export const SplineClientOnly = () => {
  return <SplineComponent />;
};

