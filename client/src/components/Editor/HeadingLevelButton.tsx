import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.tsx';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { useEditorState } from '@tiptap/react';
import { ChevronDownIcon } from 'lucide-react';
import { type Level } from '@/utils/types';

function HeadingLevelButton() {
  const { editor } = useEditorStore();

  // Track the current heading level or paragraph reactively
  const currentHeading = useEditorState({
    editor,
    selector: ctx => {
      if (ctx.editor?.isActive('heading', { level: 1 })) return 'Heading 1';
      if (ctx.editor?.isActive('heading', { level: 2 })) return 'Heading 2';
      if (ctx.editor?.isActive('heading', { level: 3 })) return 'Heading 3';
      if (ctx.editor?.isActive('heading', { level: 4 })) return 'Heading 4';
      if (ctx.editor?.isActive('heading', { level: 5 })) return 'Heading 5';
      if (ctx.editor?.isActive('heading', { level: 6 })) return 'Heading 6';
      if (ctx.editor?.isActive('paragraph')) return 'Normal';
      return 'Normal';
    },
  });

  const headings: { label: string; value: Level }[] = [
    { label: 'Normal', value: 0 },
    { label: 'Heading 1', value: 1 },
    { label: 'Heading 2', value: 2 },
    { label: 'Heading 3', value: 3 },
    { label: 'Heading 4', value: 4 },
    { label: 'Heading 5', value: 5 },
    { label: 'Heading 6', value: 6 },
  ];

  const handleHeadingChange = (level: Level) => {
    if (level === 0) {
      // Convert to normal paragraph
      editor?.chain().focus().setParagraph().run();
    } else {
      // Set heading level
      editor?.chain().focus().toggleHeading({ level: level }).run();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>{currentHeading}</span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {headings.map(({ label, value }) => {
          return (
            <button
              onClick={() => handleHeadingChange(value)}
              key={value}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                currentHeading === label && 'bg-neutral-200/80'
              )}>
              <DropdownMenuItem
                className={cn(
                  'text-sm',
                  value === 1 && 'text-2xl font-bold',
                  value === 2 && 'text-xl font-bold',
                  value === 3 && 'text-lg font-semibold',
                  value === 4 && 'text-base font-semibold',
                  value === 5 && 'text-sm font-semibold',
                  value === 6 && 'text-xs font-semibold'
                )}>
                {label}
              </DropdownMenuItem>
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeadingLevelButton;
