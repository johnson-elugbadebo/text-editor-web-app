import { LiveblocksProvider } from '@liveblocks/react/suspense';
import { useAuth } from '@clerk/clerk-react';

// Convert .convex.cloud to .convex.site for HTTP actions
const convexSiteUrl = (import.meta.env.VITE_CONVEX_URL as string).replace('.convex.cloud', '.convex.site');
console.log(convexSiteUrl);

function LiveblocksWrapper({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  return (
    <LiveblocksProvider
      preventUnsavedChanges
      throttle={16}
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
