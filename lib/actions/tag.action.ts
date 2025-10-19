'use server';

import Tag, { ITag } from '@/database/tag.model';
import { connectToDatabase } from '../mongoose';
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams
} from './shared.types';
import { FilterQuery } from 'mongoose';
import Question from '@/database/question.model';
import User from '@/database/user.model';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const { userId } = params;

    // Find interactions for user and group by tags...
    // Interaction...

    return [
      { _id: '1', name: 'tag 1' },
      { _id: '2', name: 'tag 2' }
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 20 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, 'i') } }];
    }

    let sortStage: Record<string, 1 | -1> = {};

    switch (filter) {
      case 'popular':
        // ✅ sort by number of questions (descending)
        sortStage = { questionsCount: -1 };
        break;
      case 'recent':
        sortStage = { createdOn: -1 };
        break;
      case 'name':
        sortStage = { name: 1 };
        break;
      case 'old':
        sortStage = { createdOn: 1 };
        break;
      default:
        sortStage = { createdAt: -1 };
        break;
    }

    // ✅ use aggregation when sorting by computed field
    const pipeline: any[] = [
      { $match: query },
      {
        $addFields: {
          questionsCount: { $size: { $ifNull: ['$questions', []] } }
        }
      },
      { $sort: sortStage },
      { $skip: skipAmount },
      { $limit: pageSize }
    ];

    const tags = await Tag.aggregate(pipeline).collation({
      locale: 'en',
      strength: 2
    });

    const totalTags = await Tag.countDocuments(query);
    const totalPages = Math.ceil(totalTags / pageSize);

    return { tags, totalPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();

    const { tagId, page = 1, pageSize = 20, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: searchQuery, $options: 'i' } }
      : {};

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' }
      ]
    });

    const questions = tag.questions;

    const isNext = tag.questions.length > pageSize;

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, totalQuestions: { $size: '$questions' } } },
      { $sort: { totalQuestions: -1 } },
      { $limit: 5 }
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
