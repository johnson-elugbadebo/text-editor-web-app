import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { type DocumentInputProps } from '../../utils';
import { useStatus } from '@liveblocks/react';
import { useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { useRef, useState } from 'react';
// import { LogIn } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { LoaderIcon } from 'lucide-react';

function DocumentInput({ title, id }: DocumentInputProps) {
  const status = useStatus();
  const [value, setValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const mutate = useMutation(api.documents.updateDocumentById);

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    try {
      setIsPending(true);
      mutate({ id, title: newValue });
      // toast.success('Document updated')
    } catch (error) {
      console.log(error);
      // toast.error('Sometimes went wrong')
    } finally {
      setIsPending(false);
    }
  }, 500);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsPending(true);
      mutate({ id, title: value });
      // toast.success('Document updated');
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      // toast.error('Sometimes went wrong'))
    } finally {
      setIsPending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  };

  const showLoader = isPending || status === 'connecting' || status === 'reconnecting';
  const showError = status === 'disconnected';

  return (
    <div className='flex items-center gap-2'>
      {isEditing ? (
        <form onSubmit={handleSubmit} className='relative w-fit max-w-[50ch]'>
          <span className='invisible whitespace-pre px-1.5 text-lg'>{value || ' '}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            className='absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate'
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className='text-lg px-1.5 cursor-pointer truncate'>
          {title}
        </span>
      )}

      {showError && <BsCloudSlash className='size-4' />}
      {!showError && !showLoader && <BsCloudCheck className='size-4' />}
      {showLoader && <LoaderIcon className='size-4 animate-spin text-muted-foreground' />}
    </div>
  );
}

export default DocumentInput;
