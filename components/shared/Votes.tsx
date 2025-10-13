'use client';

import {
  downvoteQuestion,
  upvoteQuestion
} from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved
}: Props) => {
  const path = usePathname();

  const handleSave = async () => {
    await toggleSaveQuestion({ userId, questionId: itemId, path });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === 'upvote') {
      if (type === 'question') {
        await upvoteQuestion({
          questionId: itemId,
          userId,
          hasupVoted,
          hasdownVoted,
          path
        });
      } else if (type === 'answer') {
      }

      // TODO: show a toasty
      return;
    }

    if (action === 'downvote') {
      if (type === 'question') {
        await downvoteQuestion({
          questionId: itemId,
          userId,
          hasupVoted,
          hasdownVoted,
          path
        });
      } else if (type === 'answer') {
      }

      // TODO: show a toasty
      return;
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center 5 gap-2">
        <div className="flex-center 5 gap-1">
          <Image
            src={
              hasupVoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote('upvote')}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center 5 gap-1">
          <Image
            src={
              hasdownVoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote('downvote')}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      <Image
        src={
          hasSaved
            ? '/assets/icons/star-filled.svg'
            : '/assets/icons/star-red.svg'
        }
        alt="star"
        width={18}
        height={18}
        className="cursor-pointer"
        onClick={() => handleSave()}
      />
    </div>
  );
};

export default Votes;
