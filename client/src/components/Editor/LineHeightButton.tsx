import { useEditorStore } from '@/store/use-editor-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ListCollapseIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorState } from '@tiptap/react';

function LineHeightButton() {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: 'Default', value: 'normal' },
    { label: '1.00', value: '1.00' },
    { label: '1.25', value: '1.25' },
    { label: '1.50', value: '1.50' },
    { label: '1.75', value: '1.75' },
    { label: '2.00', value: '2.00' },
  ];

  // Track the current line height reactively
  const currentLineHeight = useEditorState({
    editor,
    selector: ctx => {
      if (!ctx.editor) return 'normal';

      const { $from } = ctx.editor.state.selection;
      const node = $from.node($from.depth);

      // Check if the current node is a paragraph or heading
      if (node.type.name === 'paragraph' || node.type.name === 'heading') {
        return node.attrs.lineHeight || 'normal';
      }

      return 'normal';
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <ListCollapseIcon className='size-4' />
          {/* <span className='text-xs ml-1'>{currentLineHeight === 'normal' ? 'Default' : currentLineHeight}</span> */}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lineHeights.map(({ label, value }) => {
          return (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setLineHeight(value).run()}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                currentLineHeight === value && 'bg-neutral-200/80'
              )}>
              <span className='text-sm'>{label}</span>
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LineHeightButton;
