'use server';

import Question from '@/database/question.model';
import { ViewQuestionParams } from './shared.types';
import { connectToDatabase } from '../mongoose';
import Interaction from '@/database/interaction.model';

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { userId, questionId } = params;

    // Update view counts for question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        question: questionId,
        action: 'view'
      });

      if (!existingInteraction) return console.log('User has already viewed');

      await Interaction.create({
        user: userId,
        question: questionId,
        action: 'view'
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
