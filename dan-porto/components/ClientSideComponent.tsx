'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Client-side component to handle smooth scrolling
export default function ClientSideScroll() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the section ID from the URL query parameter
    const section = searchParams.get('section');
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        // Perform smooth scroll
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  return null;
}