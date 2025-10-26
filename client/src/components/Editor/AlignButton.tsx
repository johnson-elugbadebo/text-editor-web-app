import { useEditorStore } from '@/store/use-editor-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorState } from '@tiptap/react';

function AlignButton() {
  const { editor } = useEditorStore();

  const alignments = [
    { label: 'Align Left', value: 'left', icon: AlignLeftIcon },
    { label: 'Align Center', value: 'center', icon: AlignCenterIcon },
    { label: 'Align Right', value: 'right', icon: AlignRightIcon },
    { label: 'Align Justify', value: 'justify', icon: AlignJustifyIcon },
  ];

  // Track the current text alignment reactively
  const currentAlignment = useEditorState({
    editor,
    selector: ctx => {
      if (ctx.editor?.isActive({ textAlign: 'left' })) return 'left';
      if (ctx.editor?.isActive({ textAlign: 'center' })) return 'center';
      if (ctx.editor?.isActive({ textAlign: 'right' })) return 'right';
      if (ctx.editor?.isActive({ textAlign: 'justify' })) return 'justify';
      return 'left'; // Default alignment
    },
  });

  // Get the icon for the current alignment
  const CurrentIcon = alignments.find(a => a.value === currentAlignment)?.icon || AlignLeftIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <CurrentIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {alignments.map(({ label, value, icon: Icon }) => {
          return (
            <button
              key={value}
              onClick={() => editor?.chain().focus().setTextAlign(value).run()}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                currentAlignment === value && 'bg-neutral-200/80'
              )}>
              <Icon className='size-4' />
              <span className='text-sm'>{label}</span>
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AlignButton;
