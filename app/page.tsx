import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { readUserSession } from "@/app/actions";
import { SplineClientOnly } from "@/components/SplineClientOnly";

export default async function Home() {
  const result = await readUserSession();
  if (!result.success) {
    return redirect("/auth");
  }
  return (
    <div className="bg-gradient-to-t from-[#111627] to-[#344378] h-screen">
      <div className="absolute w-full h-full text-white flex flex-col justify-between">
        <div className="flex flex-col">
          <Navbar />
          <Header />
        </div>
        <Footer />
      </div>
      <SplineClientOnly />
    </div>
  );
}
