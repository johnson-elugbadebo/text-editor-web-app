import { LiveblocksProvider } from '@liveblocks/react/suspense';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useMemo, useState } from 'react';
import { generateColor } from '../../utils';
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { type User } from '../../utils';

// Convert .convex.cloud to .convex.site for HTTP actions
const convexSiteUrl = (import.meta.env.VITE_CONVEX_URL as string).replace('.convex.cloud', '.convex.site');
console.log(convexSiteUrl);

function LiveblocksWrapper({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  // Fetch users from Convex (which fetches from Clerk)
  const getUsersAction = useAction(api.users.getUsers);
  const [usersFromConvex, setUsersFromConvex] = useState<User[]>([]);

  // Fetch users on mount
  useEffect(() => {
    getUsersAction({}).then(setUsersFromConvex).catch(console.error);
  }, [getUsersAction]);

  // Transform memberships to users
  const users = useMemo(() => {
    if (!usersFromConvex || usersFromConvex.length === 0) return [];

    return usersFromConvex.map(user => ({
      ...user,
      color: generateColor(user.name || user.id),
    }));
  }, [usersFromConvex]);

  console.log('Liveblocks users:', users);

  console.log('Liveblocks users:', users);

  return (
    <LiveblocksProvider
      preventUnsavedChanges
      throttle={16}
      resolveUsers={({ userIds }) => {
        // resolveUsers - Maps user IDs to user info (name, avatar, color) for displaying collaborators in the UI
        return userIds.map(userId => users.find(user => user.id === userId) ?? undefined);
      }}
      resolveMentionSuggestions={({ text }) => {
        // resolveMentionSuggestions - Provides a list of users that can be @mentioned in the editor
        if (!users.length) return [];
        // Filter out users with undefined IDs first
        const validUsers = users.filter(user => user.id);
        let filteredUsers = validUsers;
        if (text) {
          filteredUsers = users.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
        }
        return filteredUsers.map(user => user.id!);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        return roomIds.map(roomId => ({
          id: roomId,
          name: 'Document', // Liveblocks will still work, just won't show names
        }));
      }}
      authEndpoint={async room => {
        const token = await getToken({ template: 'convex' });
        const response = await fetch(`${convexSiteUrl}/liveblocks/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ room }),
        });
        return await response.json();
      }}>
      {children}
    </LiveblocksProvider>
  );
}

export default LiveblocksWrapper;
