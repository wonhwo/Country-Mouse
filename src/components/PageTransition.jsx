'use client';

import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <main key={pathname} className="page-enter">
      {children}
    </main>
  );
}
