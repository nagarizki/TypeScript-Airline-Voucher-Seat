import { ReactNode } from 'react';

import Header from './header';
import Nav from './nav';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Nav />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}