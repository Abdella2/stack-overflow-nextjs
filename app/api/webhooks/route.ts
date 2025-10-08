import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const eventType = evt.type;

    if (eventType === 'user.created') {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name
      } = evt.data;

      const mongoUser = createUser({
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name ? ` ${last_name}` : ''}`,
        picture: image_url,
        username: username!
      });

      return NextResponse.json({ message: 'OK', mongoUser });
    }

    if (eventType === 'user.updated') {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name
      } = evt.data;

      const mongoUser = updateUser({
        clerkId: id,
        updateData: {
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name ? ` ${last_name}` : ''}`,
          picture: image_url,
          username: username
        },
        path: `/profile/${id}`
      });

      return NextResponse.json({ message: 'OK', mongoUser });
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;

      const deletedUser = deleteUser({ clerkId: id! });

      return NextResponse.json({ message: 'OK', deletedUser });
    }
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
