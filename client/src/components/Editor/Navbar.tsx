import Avatars from '@/components/Editor/Avatars';
import DocumentInput from '@/components/Editor/DocumentInput';
import Inbox from '@/components/Editor/Inbox';
import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useEditorStore } from '@/store/use-editor-store';
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { type NavbarProps } from '../../utils';
import { useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import RenameDialog from '@/components/Home/RenameDialog';
import RemoveDialog from '@/components/Home/RemoveDialog';

function Navbar({ data }: NavbarProps) {
  const { editor } = useEditorStore();
  const navigate = useNavigate();

  const mutation = useMutation(api.documents.createDocument);

  const handleNewDocument = () => {
    mutation({
      title: 'Untitled Document',
      initialContent: '',
    })
      .catch(
        error => console.log(error)
        // toast.error('Something went wrong')
      )
      .then(id =>
        // toast.success("Document Created")
        navigate(`/documents/${id}`)
      );
  };

  const handleUndo = () => {
    if (editor && !editor.isDestroyed) {
      editor.chain().focus().undo().run();
    }
  };
  const handleRedo = () => {
    if (editor && !editor.isDestroyed) {
      editor.chain().focus().redo().run();
    }
  };

  const handleInsertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    if (editor && !editor.isDestroyed) {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
    }
  };

  const handlePrint = () => {
    if (editor && !editor.isDestroyed) {
      window.print();
    }
  };

  const handleBold = () => {
    if (editor && !editor.isDestroyed) {
      editor.chain().focus().toggleBold().run();
    }
  };

  const handleItalic = () => {
    if (editor && !editor.isDestroyed) {
      editor.chain().focus().toggleItalic().run();
    }
  };

  const handleUnderline = () => {
    if (editor && !editor.isDestroyed) {
      editor.chain().focus().toggleUnderline().run();
    }
  };

  const handleStrikethrough = () => {
    if (editor && !editor.isDestroyed) {
      editor.chain().focus().toggleStrike().run();
    }
  };

  const handleRemoveFormatting = () => {
    if (editor && !editor.isDestroyed) {
      editor.chain().focus().unsetAllMarks().run();
    }
  };

  const handleDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const handleSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json',
    });
    handleDownload(blob, `${data.title}.json`);
  };

  const handleSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: 'text/html',
    });
    handleDownload(blob, `${data.title}.html`);
  };

  const handleSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: 'text/plain',
    });
    handleDownload(blob, `${data.title}.txt`);
  };

  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link to='/'>
          <img src='/logo_v6.svg' alt='Logo' width={36} height={36} />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput title={data.title} id={data._id} />
          <div className='flex'>
            <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
              {/* Menu 1 - File*/}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  File
                </MenubarTrigger>
                <MenubarContent className='print:hidden'>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className='size-4 mr-2' />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {/* Sub Item 1 */}
                      <MenubarItem onClick={handleSaveJSON}>
                        <FileJsonIcon className='size-4 mr-2' />
                        JSON
                      </MenubarItem>
                      {/* Sub Item 2 */}
                      <MenubarItem onClick={handleSaveHTML}>
                        <GlobeIcon className='size-4 mr-2' />
                        HTML
                      </MenubarItem>
                      {/* Sub Item 3 */}
                      <MenubarItem onClick={handlePrint}>
                        <BsFilePdf className='size-4 mr-2' />
                        PDF
                      </MenubarItem>
                      {/* Sub Item 4 */}
                      <MenubarItem onClick={handleSaveText}>
                        <FileTextIcon className='size-4 mr-2' />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={handleNewDocument}>
                    <FilePlusIcon className='size-4 mr-2' />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                    <MenubarItem onClick={e => e.stopPropagation()} onSelect={e => e.preventDefault()}>
                      <FilePenIcon className='size-4 mr-2' />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  <RemoveDialog documentId={data._id}>
                    <MenubarItem onClick={e => e.stopPropagation()} onSelect={e => e.preventDefault()}>
                      <TrashIcon className='size-4 mr-2' />
                      Delete
                    </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className='size-4 mr-2' />
                    Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              {/* Menu 2 - Edit */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={handleUndo}>
                    <Undo2Icon className='size-4 mr-2' />
                    Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={handleRedo}>
                    <Redo2Icon className='size-4 mr-2' />
                    Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              {/* Menu 3 - Insert */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => handleInsertTable({ rows: 1, cols: 1 })}>1 x 1</MenubarItem>
                      <MenubarItem onClick={() => handleInsertTable({ rows: 2, cols: 2 })}>2 x 2</MenubarItem>
                      <MenubarItem onClick={() => handleInsertTable({ rows: 3, cols: 3 })}>3 x 3</MenubarItem>
                      <MenubarItem onClick={() => handleInsertTable({ rows: 4, cols: 4 })}>4 x 4</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              {/* Menu 4 - Format */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className='size-4 mr-2' />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={handleBold}>
                        <BoldIcon className='size-4 mr-2' />
                        Bold <MenubarShortcut>Ctrl+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={handleItalic}>
                        <ItalicIcon className='size-4 mr-2' />
                        Italic <MenubarShortcut>Ctrl+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={handleUnderline}>
                        <UnderlineIcon className='size-4 mr-2' />
                        Underline <MenubarShortcut>Ctrl+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={handleStrikethrough}>
                        <StrikethroughIcon className='size-4 mr-2' />
                        Strikethrough&nbsp;&nbsp; <MenubarShortcut>Ctrl+K</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={handleRemoveFormatting}>
                    <RemoveFormattingIcon className='size-4 mr-2' />
                    Clear formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className='flex gap-3 items-center pl-6'>
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterSelectPersonalUrl='/'
        />
        <UserButton />
      </div>
    </nav>
  );
}

export default Navbar;
