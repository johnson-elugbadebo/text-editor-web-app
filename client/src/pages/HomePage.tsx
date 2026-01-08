import Navbar from '@/components/Home/Navbar';
import TemplateGallery from '@/components/Home/TemplateGallery';
import { usePaginatedQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useSearchParams } from '@/hooks/use-search-params';
import DocumentsTable from '@/components/Home/DocumentsTable';
// import ErrorThrower from '@/components/ErrorThrower';

function HomePage() {
  const [search] = useSearchParams('search');
  const { results, status, loadMore } = usePaginatedQuery(api.documents.getDocuments, { search }, { initialNumItems: 5 });

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        {/* <ErrorThrower /> */}
        <TemplateGallery />
        <DocumentsTable documents={results} loadMore={loadMore} status={status} />
      </div>
    </div>
  );
}

export default HomePage;
