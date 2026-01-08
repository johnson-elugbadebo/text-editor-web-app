import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import EditorInstance from '@/components/Editor/Editor';
import Navbar from '@/components/Editor/Navbar';
import Toolbar from '@/components/Editor/Toolbar';
import FullScreenLoader from '@/components/Auth/FullScreenLoader';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { DEFAULT_MARGIN } from '@/constants/margins';

export function Document({ documentId }: { documentId: string | undefined }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const document = useQuery(api.documents.getDocumentById, documentId ? { id: documentId as any } : 'skip');

  if (!document) {
    return <FullScreenLoader label='Loading document...' />;
  }

  return (
    <div className='flex min-h-screen justify-center -ml-6'>
      <RoomProvider
        id={documentId ?? 'fallback-room-id'}
        initialStorage={{ leftMargin: DEFAULT_MARGIN, rightMargin: DEFAULT_MARGIN }}
        initialPresence={{
          cursor: null,
          colors: ['red', 'purple'],
          selection: {
            id: 72426,
          },
        }}>
        <ClientSideSuspense fallback={<FullScreenLoader label='Room Loading...' />}>
          <div className='min-h-screen bg-[#FAFBFD] pl-0 pr-2'>
            <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
              <Navbar data={document} />
              <Toolbar />
            </div>

            <div className='pt-[114px] print:pt-0'>
              <EditorInstance initialContent={document.initialContent} />
            </div>
          </div>
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  );
}
