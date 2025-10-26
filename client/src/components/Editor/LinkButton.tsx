import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/store/use-editor-store';
import { useEditorState } from '@tiptap/react';
import { Link2Icon } from 'lucide-react';
import { useState } from 'react';

function LinkButton() {
  const { editor } = useEditorStore();
  const [value, setValue] = useState('');

  // Track the current link reactively
  const currentLink = useEditorState({
    editor,
    selector: ctx => {
      return ctx.editor?.getAttributes('link').href || '';
    },
  });

  const handleChange = (href: string) => {
    if (href) {
      // Set the link
      editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    } else {
      // Remove the link if href is empty
      editor?.chain().focus().unsetLink().run();
    }
    setValue('');
  };
  return (
    <DropdownMenu
      onOpenChange={open => {
        // When dropdown opens, set the input value to the current link
        if (open) {
          setValue(currentLink || '');
        }
      }}>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <Link2Icon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
        <Input placeholder='https://example.com' value={value} onChange={e => setValue(e.target.value)} />
        <Button onClick={() => handleChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinkButton;
