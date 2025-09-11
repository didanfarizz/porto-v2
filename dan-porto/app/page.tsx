// import Image from "next/image";
import Navbar from "@/components/navbar";
import Dashboard from "@/components/dashboard";
import ParallaxText from "@/components/parallax";
import Service from "@/components/service";
import Project from "@/components/project";
import Contact from "@/components/Contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="overflow-x-hidden relative w-screen min-h-screen outline outline-red-500">
      <div className="bg-purple w-64 h-64 right-0 rounded-full absolute translate-x-20 -translate-y-1/2 blur-3xl"></div>
      <div className="py-6">
        <Navbar />
      </div>
      <div className="py-5">
        <Dashboard />
        <ParallaxText />
      </div>
      <div className="py-8">
        <Service />
      </div>
      <div className="mt-16">
        <Project />
      </div>
      <div className="py-8">
        <Contact />
      </div>
        <Footer />
    </div>
  );
}
