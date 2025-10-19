import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import AnswerCard from './cards/AnswerCard';
import page from '@/app/(root)/(home)/page';
import Pagination from './Pagination';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId: string;
}

const AnswersTab = async ({ userId, clerkId, searchParams }: Props) => {
  const { page } = await searchParams;
  const result = await getUserAnswers({ userId, page: page ? +page : 1 });

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes}
          createdAt={answer.createdAt}
        />
      ))}
      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
      </div>
    </>
  );
};

export default AnswersTab;
