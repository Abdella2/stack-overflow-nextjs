'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams
} from './shared.types';
import Question from '@/database/question.model';

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userParams: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userParams);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error('User not found!');
    }

    // Delete user from database
    // and question, answers, comments, etc.

    // get user questions ids
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      '_id'
    );

    // delete user question
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments etc

    // delete user
    const deletedUser = await User.findOneAndDelete(user._id);

    return deleteUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
