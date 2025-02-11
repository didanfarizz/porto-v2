// import Image from "next/image";
import Navbar from "@/components/navbar";
import Dashboard from "@/components/dashboard";

export default function Home() {
  return (
    <div className="overflow-x-hidden relative w-screen min-h-screen outline outline-red-500">
      <div className="bg-purple w-64 h-64 right-0 rounded-full absolute translate-x-20 -translate-y-1/2 blur-3xl"></div>
      <div className="py-6">
        <Navbar />
      </div>
      <div className="py-16">
        <Dashboard />
      </div>
    </div>
  );
}
