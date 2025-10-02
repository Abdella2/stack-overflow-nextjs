'use client';

import { sidebarLinks } from '@/constants';
import { SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';

const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 light-border shadow-light-300 custom-scroll fixed top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-[266px] dark:shadow-none">
      <div className="flex flex-1 flex-col">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route ||
            (item.route !== '/' && pathname.startsWith(item.route));
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? 'primary-gradient text-light-900 rounded-lg'
                  : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}>
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p
                className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="sm-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                width={20}
                height={20}
                alt="login"
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="sm-medium light-border-2 btn-tertiary text-dark400-light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/signup.svg"
                width={20}
                height={20}
                alt="sign up"
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Log In</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
