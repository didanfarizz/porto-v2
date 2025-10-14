// import Image from "next/image";
import Navbar from '@/components/navbar';
import Dashboard from '@/components/dashboard';
import ParallaxText from '@/components/parallax';
import Service from '@/components/service';
import Project from '@/components/project';
import Contact from '@/components/Contact';
import Footer from '@/components/footer';
import ClientSideScroll from '@/components/ClientSideComponent';
import { Suspense } from 'react';
import ScrollAnimationWrapper from '@/components/ui/ScrollAnimationWrapper';

export default function Home() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <ClientSideScroll />
      </Suspense>
      <div className="overflow-hidden relative w-full min-h-screen">
        <div className="bg-purple w-64 h-64 right-0 rounded-full absolute translate-x-20 -translate-y-1/2 blur-3xl"></div>

        <ScrollAnimationWrapper>
          <div id="home" className="py-11">
            <Dashboard />
            <ParallaxText />
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <div id="service" className="py-16">
            <Service />
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <div id="project" className="py-32">
            <Project />
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <div id="contact" className="mt-16">
            <Contact />
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <Footer />
        </ScrollAnimationWrapper>
      </div>
    </>
  );
}
