import { Document } from '@/pages/Document';
import { useParams } from 'react-router-dom';

function SingleDocument() {
  const { id } = useParams<{ id: string }>();
  return <Document documentId={id} />;
}

export default SingleDocument;
