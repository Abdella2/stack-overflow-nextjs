'use server';

import Question from '@/database/question.model';
import { connectToDatabase } from '../mongoose';
import { SearchParams } from './shared.types';
import Answer from '@/database/answer.model';
import User from '@/database/user.model';
import Tag from '@/database/tag.model';

const searchableTypes = ['question', 'answer', 'user', 'tag'];

export async function globalSearch(params: SearchParams) {
  try {
    connectToDatabase();

    const { query, type } = params;
    const regex = { $regex: query, $options: 'i' };

    let results: any = [];

    const modelsAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: Tag, searchField: 'name', type: 'tag' }
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !searchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYTHING
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regex })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              typeLower === 'answer'
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              typeLower === 'user'
                ? item.clerkId
                : typeLower === 'answer'
                  ? item.question
                  : item._id
          }))
        );
      }
    } else {
      // SEARCH IN THE SPECIFIC MODEL
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);

      if (!modelInfo) throw new Error('Invalid search type');

      const searchResult = await modelInfo.model
        .find({ [modelInfo.searchField]: regex })
        .limit(8);

      results = searchResult.map((item) => ({
        title:
          typeLower === 'answer'
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          typeLower === 'user'
            ? item.clerkId
            : typeLower === 'answer'
              ? item.question
              : item._id
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log('Error fetching global results', error);
    throw error;
  }
}
