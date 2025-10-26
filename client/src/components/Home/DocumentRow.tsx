import { format } from 'date-fns';
import { SiGoogledocs } from 'react-icons/si';
import { TableCell, TableRow } from '@/components/ui/table';
import { Building2Icon, CircleUserIcon } from 'lucide-react';
import DocumentMenu from './DocumentMenu';
import { useNavigate } from 'react-router-dom';
import { type DocumentRowProps } from '../../utils';

function DocumentRow({ document }: DocumentRowProps) {
  const navigate = useNavigate();
  const handleNavigation = () => navigate(`/documents/${document._id}`);
  const handleOpenDocumentInNewTab = () => window.open(`/documents/${document._id}`, '_blank');

  return (
    <TableRow className='cursor-pointer' onClick={handleNavigation}>
      <TableCell className='w-[50px]'>
        <SiGoogledocs className='size-6 fill-blue-500' />
      </TableCell>
      <TableCell className='font-medium md:w-[45%]'>{document.title}</TableCell>
      <TableCell className='text-muted-foreground hidden md:flex items-center gap-2'>
        {document.organizationId ? <Building2Icon className='size-4' /> : <CircleUserIcon className='size-4' />}
        {document.organizationId ? 'Organization' : 'Personal'}
      </TableCell>
      <TableCell className='text-muted-foreground hidden md:table-cell'>
        {format(new Date(document._creationTime), 'MMM dd, yyyy')}
      </TableCell>
      <TableCell className='flex justify-end'>
        <DocumentMenu documentId={document._id} title={document.title} onNewTab={handleOpenDocumentInNewTab} />
      </TableCell>
    </TableRow>
  );
}

export default DocumentRow;
