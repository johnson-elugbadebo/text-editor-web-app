import '@liveblocks/react-ui/styles.css';
import '@liveblocks/react-tiptap/styles.css';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import LiveblocksWrapper from '@/components/Editor/LiveBlocksWrapper.tsx';
// import { toast } from 'sonner';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} signInFallbackRedirectUrl='/' signUpFallbackRedirectUrl='/'>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <LiveblocksWrapper>
          <App />
        </LiveblocksWrapper>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </StrictMode>
);
