import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RenderTag from './RenderTag';
import { getHotQuestions } from '@/lib/actions/question.action';

const popularTags = [
  { _id: '1', name: 'javascript', totalQuestions: 5 },
  { _id: '2', name: 'next', totalQuestions: 3 },
  { _id: '3', name: 'react', totalQuestions: 8 },
  { _id: '4', name: 'tailwind', totalQuestions: 2 },
  { _id: '5', name: 'css', totalQuestions: 4 }
];
const RightSidebar = async () => {
  const topQuestions = await getHotQuestions();
  return (
    <section className="background-light900_dark200 light-border shadow-light-300 custom-scroll sticky top-0 right-0 flex h-screen w-[350px] flex-col overflow-y-auto border-r p-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7">
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="chevron right"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex w-full flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
