'use server';

import { connectToDatabase } from '../mongoose';
import { GetTopInteractedTagsParams } from './shared.types';

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
