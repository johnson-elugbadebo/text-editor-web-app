// Create a new file: client/src/components/ErrorThrower.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';

function ErrorThrower() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('This is a test error for the error boundary!');
  }

  return (
    <div className='p-4 border rounded-lg'>
      <h3 className='text-lg font-semibold mb-2'>Error Boundary Test</h3>
      <p className='text-sm text-gray-600 mb-4'>Click the button below to throw an error and test the error boundary.</p>
      <Button onClick={() => setShouldThrow(true)} variant='destructive'>
        Throw Error
      </Button>
    </div>
  );
}

export default ErrorThrower;
