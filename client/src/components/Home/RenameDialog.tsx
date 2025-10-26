import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';
import { type RenameDialogProps } from '../../utils';
import { Button } from '@/components/ui/button';

function RenameDialog({ documentId, initialTitle, children }: RenameDialogProps) {
  const update = useMutation(api.documents.updateDocumentById);
  const [isUpdating, setIsUpdating] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      update({ id: documentId, title: title.trim() || 'Untitled' });
      setOpen(false); // Only close on success
      // toast.success('Document renamed'))
    } catch (error) {
      console.log(error);
      // toast.error('Something went wrong'))
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={handleStopPropagation}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>Enter a new name for this document</DialogDescription>
          </DialogHeader>
          <div className='my-4'>
            <Input placeholder='Document name' value={title} onClick={handleStopPropagation} onChange={handleTitleChange} />
          </div>
          <DialogFooter>
            <Button type='button' variant='ghost' disabled={isUpdating} onClick={handleCancel}>
              Cancel
            </Button>
            <Button type='submit' disabled={isUpdating} onClick={handleStopPropagation}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RenameDialog;
