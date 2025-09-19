'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Routes where the header should not be displayed
  const routesWithoutHeader = [
    '/login',
    '/register', 
    '/forgot-password',
    '/'
  ];

  if (routesWithoutHeader.includes(pathname)) {
    return null;
  }

  return <Header />;
}