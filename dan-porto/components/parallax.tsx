'use client'
import './styles.css';
import { JSX } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { FaReact, FaNodeJs, FaHtml5, FaCss3, FaJs, FaPython } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiPostgresql, SiFigma, SiVite, SiBootstrap, SiMysql, SiGit, SiExpress } from 'react-icons/si';

interface ParallaxProps {
  baseVelocity: number;
  icons: { icon: JSX.Element; name: string }[];
}

function ParallaxIcons({ baseVelocity, icons }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Menghaluskan animasi
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 100,
    stiffness: 300
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1], {
    clamp: true
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 2000);
    moveBy += moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax w-full overflow-hidden">
      <motion.div 
        className="scroller flex space-x-10 text-4xl font-bold text-white"
        style={{ x }}
        transition={{ ease: "easeInOut", duration: 100 }}
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex space-x-6">
            {icons.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex flex-col items-center">
                <span className="text-white text-7xl opacity-50">{item.icon}</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function App() {
  const techIcons = [
    { icon: <FaReact />, name: "React" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3 />, name: "CSS" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaPython />, name: "Python" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <SiFigma />, name: "Figma" },
    { icon: <SiBootstrap />, name: "Bootstrap" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiGit />, name: "Git" },
    { icon: <SiVite />, name: "Vite" },
    { icon: <SiExpress />, name: "Express" },
  ];

  return (
    <section className="relative overflow-x-hidden flex flex-col space-y-4 py-8">
      <ParallaxIcons baseVelocity={-2} icons={techIcons} />
      <ParallaxIcons baseVelocity={2} icons={techIcons} />
    </section>
  );
}
