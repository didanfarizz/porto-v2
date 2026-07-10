'use client';

import dynamic from 'next/dynamic';

const Background3D = dynamic(() => import('@/components/Background3D'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full bg-[#0F0716]" />
});

export default function ClientBackground() {
  return <Background3D />;
}
