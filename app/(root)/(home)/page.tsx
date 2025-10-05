import Filter from '@/components/shared/Filter';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import Link from 'next/link';
import React from 'react';
import HomeFilters from '@/components/home/HomeFilters';
import NoResult from '@/components/shared/NoResult';
import QuestionCard from '@/components/shared/cards/QuestionCard';

const questions = [
  {
    _id: 'q1',
    title: 'How to learn React in 2025 [Updated Guide]',
    tags: [
      { _id: 't1', name: 'react' },
      { _id: 't2', name: 'javascript' }
    ],
    author: {
      _id: 'u1',
      name: 'John Doe',
      picture: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    upVotes: 950,
    views: 1200,
    answers: [
      {
        _id: 'a1',
        text: 'Start with the official docs and build small projects.'
      },
      {
        _id: 'a2',
        text: 'Try Next.js if you want to learn the ecosystem faster.'
      }
    ],
    createdAt: new Date('2023-01-01T10:00:00Z')
  },
  {
    _id: 'q2',
    title: 'What is the best way to manage state in a React application?',
    tags: [
      { _id: 't3', name: 'react' },
      { _id: 't4', name: 'state-management' }
    ],
    author: {
      _id: 'u2',
      name: 'Jane Smith',
      picture: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    upVotes: 15000,
    views: 5000000,
    answers: [
      {
        _id: 'a3',
        text: 'React Query or Zustand are great lightweight options.'
      },
      {
        _id: 'a4',
        text: 'For complex apps, Redux Toolkit is still a strong choice.'
      }
    ],
    createdAt: new Date('2025-02-15T15:30:00Z')
  },
  {
    _id: 'q3',
    title: 'How does TypeScript improve large-scale JavaScript projects?',
    tags: [
      { _id: 't5', name: 'typescript' },
      { _id: 't6', name: 'javascript' }
    ],
    author: {
      _id: 'u3',
      name: 'Alex Johnson',
      picture: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    upVotes: 3250,
    views: 3450000000,
    answers: [
      {
        _id: 'a5',
        text: 'It provides static typing that helps catch bugs early.'
      },
      {
        _id: 'a6',
        text: 'It improves developer experience with IntelliSense and tooling.'
      }
    ],
    createdAt: new Date('2024-07-10T08:45:00Z')
  }
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient !text-light-9 min-h-[46] px-4 py-3">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upVotes={question.upVotes}
              answers={question.answers}
              views={question.views}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
