import { ReactNode } from 'react';

import Nav from './nav';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="relative w-full min-h-screen bg-white pt-1">
      {/* Background - always show */}
      <div className="absolute top-0 w-full h-[1020px] bg-[linear-gradient(180deg,#85C8FF_0%,#D4D1FE_47.05%,#F5F6FB_77.08%,#FFFFFF_100%)]">
        <img 
          src="assets/images/backgrounds/Jumbo Jet Sky (1) 1.png" 
          className="absolute right-0 top-[147px] object-contain max-h-[481px]" 
          alt="background image"
        />
      </div>

      {/* Nav */}
      <Nav />

      {/* Main Content */}
      <main className="relative flex-1">
        {children}
      </main>
    </div>
  );
}
