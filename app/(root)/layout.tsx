import LeftSidebar from '@/components/shared/LeftSidebar';
import Navbar from '@/components/shared/navbar/Navbar';
import RightSidebar from '@/components/shared/RightSidebar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar></LeftSidebar>
        <section className="flex min-h-screen flex-1 flex-col px-6 pt-36 pb-6 max-md:px-14 sm:px-14">
          <div className="max-w-5l mx-auto w-full">{children}</div>
        </section>
        <RightSidebar />
      </div>
      Toast
    </main>
  );
};

export default Layout;
