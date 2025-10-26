// import { type DocumentIDPageProps } from '../utils';
// import EditorInstance from '@/components/Editor (legacy)';
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import EditorInstance from '@/components/Editor/Editor';
import Navbar from '@/components/Editor/Navbar';
import Toolbar from '@/components/Editor/Toolbar';
import { useParams } from 'react-router-dom';

function SingleDocument() {
  const { id } = useParams<{ id: string }>();
  // const awaitedParams = await params;
  // const documentId = awaitedParams.documentId;
  return (
    <RoomProvider
      id={id ?? 'fallback-room-id'}
      initialPresence={{
        cursor: null,
        colors: ['red', 'purple'],
        selection: {
          id: 72426,
        },
      }}>
      <ClientSideSuspense fallback={<div>Loading collaborative editor...</div>}>
        <div className='min-h-screen bg-[#FAFBFD]'>
          <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
            <Navbar />
            <Toolbar />
          </div>
          <div className='pt-[114px] print:pt-0'>
            <EditorInstance />
          </div>
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default SingleDocument;
