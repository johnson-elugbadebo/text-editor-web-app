import { Button } from '@/components/ui/button';
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from 'lucide-react';
import { type DocumentMenuProps } from '../../utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import RemoveDialog from './RemoveDialog';
import RenameDialog from './RenameDialog';
// import { useState } from 'react';

function DocumentMenu({ documentId, title, onNewTab }: DocumentMenuProps) {
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handlePreventDefault = (e: Event) => {
    e.preventDefault();
    // setTimeout(() => setDropdownOpen(false), 0);
    // setDropdownOpen(false); // Close dropdown when dialog opens
  };

  const handleNewTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNewTab(documentId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem onSelect={handlePreventDefault} onClick={handleStopPropagation}>
            <FilePenIcon className='size-4 mr-2' />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem onSelect={handlePreventDefault} onClick={handleStopPropagation}>
            <TrashIcon className='size-4 mr-2' />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={handleNewTab}>
          <ExternalLinkIcon className='size-4 mr-2' />
          open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DocumentMenu;
