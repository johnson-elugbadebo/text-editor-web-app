// import { type DocumentIDPageProps } from '../utils';
// import EditorInstance from '@/components/Editor (legacy)';
import EditorInstance, { EditorProvider } from '@/components/Not In Use/Editor__Alt';
import Toolbar from '@/components/Not In Use/Toolbar__Alt';
// import { useParams } from 'react-router-dom';

function SingleDocument() {
  // const { id } = useParams<{ id: string }>();
  // const awaitedParams = await params;
  // const documentId = awaitedParams.documentId;
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <EditorProvider>
        <Toolbar />
        <EditorInstance />
      </EditorProvider>
    </div>
  );
}

export default SingleDocument;
