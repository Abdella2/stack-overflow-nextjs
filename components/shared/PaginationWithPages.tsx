'use client';

import React from 'react';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';

interface Props {
  pageNumber: number;
  totalPages: number;
}

const PaginationWithPages = ({ pageNumber, totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (newPage: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: newPage.toString()
    });
    router.push(newUrl);
  };

  // ✅ Don't render pagination if only 1 page
  if (totalPages <= 1) return null;

  // ✅ Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      {/* Prev Button */}
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation(pageNumber - 1)}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border">
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === pageNumber ? 'default' : 'outline'}
          onClick={() => handleNavigation(page)}
          className={`min-h-[36px] px-3.5 py-2 ${
            page === pageNumber
              ? 'bg-primary-500 text-light-900'
              : 'light-border-2 text-dark200_light800'
          }`}>
          <p className="body-semibold">{page}</p>
        </Button>
      ))}

      {/* Next Button */}
      <Button
        disabled={pageNumber === totalPages}
        onClick={() => handleNavigation(pageNumber + 1)}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border">
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default PaginationWithPages;
