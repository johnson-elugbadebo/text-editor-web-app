import { Button } from '@/components/ui/button';
import { AlertTriangleIcon } from 'lucide-react';
// import { Link } from 'react-router-dom';
import { type FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center space-y-6'>
      <div className='text-center space-y-4'>
        <div className='flex justify-center'>
          <div className='bg-rose-100 p-3 rounded-full'>
            <AlertTriangleIcon className='size-10 text-rose-600' />
          </div>
        </div>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-gray-900'>Something went wrong</h2>
          <p>{error.message}</p>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        <Button onClick={resetErrorBoundary} className='font-medium px-6'>
          Try again
        </Button>
        <Button
          onClick={() => {
            resetErrorBoundary();
            navigate('/');
          }}
          variant='ghost'
          className='font-medium px-6'>
          Go back
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
