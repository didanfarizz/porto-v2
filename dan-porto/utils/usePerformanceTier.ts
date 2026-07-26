'use client';

import { useState, useEffect } from 'react';

export interface PerformanceTier {
  isLowEnd: boolean;
  isTabVisible: boolean;
  dpr: number;
}

export function usePerformanceTier(): PerformanceTier {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    // 1. Device Hardware & Screen Detection
    const checkPerformance = () => {
      if (typeof window === 'undefined') return;

      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
      const cores = navigator.hardwareConcurrency || 8;
      const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      // Low end if CPU cores < 4, RAM < 4GB, or small mobile screen
      const lowEndDetected = memory < 4 || cores < 4 || (isMobile && cores <= 4);
      setIsLowEnd(lowEndDetected);

      // Pixel ratio capping (max 1.5 for performance, min 1)
      const rawDpr = window.devicePixelRatio || 1;
      const cappedDpr = lowEndDetected ? 1 : Math.min(rawDpr, 1.5);
      setDpr(cappedDpr);
    };

    checkPerformance();

    // 2. Page Visibility API
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', checkPerformance);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', checkPerformance);
    };
  }, []);

  return { isLowEnd, isTabVisible, dpr };
}
