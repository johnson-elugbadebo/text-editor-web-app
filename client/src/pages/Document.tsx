// import { type DocumentIDPageProps } from '../utils';
// import EditorInstance from '@/components/Editor (legacy)';
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import EditorInstance from '@/components/Editor/Editor';
import Navbar from '@/components/Editor/Navbar';
import Toolbar from '@/components/Editor/Toolbar';
// import { useParams } from 'react-router-dom';
import FullScreenLoader from '@/components/Auth/FullScreenLoader';
// import { type DocumentProps } from '../utils';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { DEFAULT_MARGIN } from '@/constants/margins';

export function Document({ documentId }: { documentId: string | undefined }) {
  // const document = usePreloadedQuery(preloadedDocument);
  // const { id } = useParams<{ id: string }>();
  // const awaitedParams = await params;
  // const documentId = awaitedParams.documentId;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const document = useQuery(api.documents.getDocumentById, documentId ? { id: documentId as any } : 'skip');

  if (!document) {
    return <FullScreenLoader label='Loading document...' />;
  }

  return (
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
        <div className='min-h-screen bg-[#FAFBFD]'>
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
  );
}
