import { action } from './_generated/server';
import { createClerkClient } from '@clerk/backend';

declare const process: { env: Record<string, string | undefined> };

export const getUsers = action({
  args: {},
  handler: async ctx => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error('Unauthorized');
    }

    // Debug: Check if secret key exists
    console.log('CLERK_SECRET_KEY exists:', !!process.env.CLERK_SECRET_KEY);
    console.log('CLERK_SECRET_KEY first 10 chars:', process.env.CLERK_SECRET_KEY?.substring(0, 10));

    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

    try {
      // Simplified: Just fetch all users (up to limit)
      const response = await clerk.users.getUserList({
        limit: 100, // Remove organizationId filter
      });

      const users = response.data.map(user => ({
        id: user.id,
        name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
        avatar: user.imageUrl,
        color: '',
      }));

      console.log('Fetched users:', users.length);
      return users;
    } catch (error) {
      console.error('Clerk API Error:', error);
      throw error;
    }
  },
});
