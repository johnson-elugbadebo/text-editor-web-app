import { toast } from 'sonner';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { api } from '../../../convex/_generated/api';
import { type RemoveDialogProps } from '../../utils';
import { Button } from '@/components/ui/button';

function RemoveDialog({ documentId, children }: RemoveDialogProps) {
  const [open, setOpen] = useState(false);
  const remove = useMutation(api.documents.removeDocumentById);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // toast.success('Test'); // Add this line
    setIsRemoving(true);
    try {
      await remove({ id: documentId });
      toast.success('Document deleted');
      // setOpen(false); // Close dialog after successful delete
    } catch (error) {
      toast.error('Not authorized to delete');
      console.log(error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onMouseDown={handleStopPropagation} onClick={handleStopPropagation}>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your document.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type='button' variant='ghost' onClick={handleCancel}>
            Cancel
          </Button>
          <Button type='button' disabled={isRemoving} onClick={handleRemove}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RemoveDialog;
