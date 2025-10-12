'use server';

import Answer from '@/database/answer.model';
import { connectToDatabase } from '../mongoose';
import { CreateAnswerParams } from './shared.types';
import Question from '@/database/question.model';

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = new Answer({
      content,
      author,
      question
    });

    console.log({ newAnswer });

    // Add the answer to the question's answer array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id }
    });

    // TODO: Add interactions...
  } catch (error) {
    console.log(error);
    throw error;
  }
}
