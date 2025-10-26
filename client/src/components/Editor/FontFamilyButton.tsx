import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.tsx';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { useEditorState } from '@tiptap/react';
import { ChevronDownIcon } from 'lucide-react';

function FontFamilyButton() {
  const { editor } = useEditorStore();

  // Track the current font family reactively
  const currentFontFamily = useEditorState({
    editor,
    selector: ctx => {
      return ctx.editor?.getAttributes('textStyle').fontFamily || 'Arial';
    },
  });

  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Inter', value: 'Inter' },
    { label: 'Monospace', value: 'monospace' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>{currentFontFamily}</span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {fonts.map(({ label, value }) => {
          return (
            <button
              onClick={() => editor?.chain().focus().setFontFamily(value).run()}
              key={value}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80'
              )}
              style={{ fontFamily: value }}>
              <DropdownMenuItem className='text-sm'>{label}</DropdownMenuItem>
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FontFamilyButton;
