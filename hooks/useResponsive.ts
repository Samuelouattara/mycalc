'use client';

import { useState, useEffect } from 'react';

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  screenWidth: number;
  device: 'mobile' | 'tablet' | 'desktop' | 'large-desktop';
}

// Breakpoints basés sur Tailwind CSS
const BREAKPOINTS = {
  sm: 640,   // Mobile large
  md: 768,   // Tablet
  lg: 1024,  // Desktop
  xl: 1280,  // Large desktop
} as const;

export const useResponsive = (): ResponsiveState => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialiser avec la largeur actuelle
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Retourner des valeurs par défaut pendant le SSR
  if (!isClient) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLargeDesktop: false,
      screenWidth: 1024,
      device: 'desktop',
    };
  }

  const isMobile = screenWidth < BREAKPOINTS.md;
  const isTablet = screenWidth >= BREAKPOINTS.md && screenWidth < BREAKPOINTS.lg;
  const isDesktop = screenWidth >= BREAKPOINTS.lg && screenWidth < BREAKPOINTS.xl;
  const isLargeDesktop = screenWidth >= BREAKPOINTS.xl;

  const device: ResponsiveState['device'] = 
    isMobile ? 'mobile' : 
    isTablet ? 'tablet' : 
    isDesktop ? 'desktop' : 
    'large-desktop';

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    screenWidth,
    device,
  };
}; 