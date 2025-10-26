import { useEditorStore } from '@/store/use-editor-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ListIcon, ListOrderedIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorState } from '@tiptap/react';

function ListButton() {
  const { editor } = useEditorStore();

  // Track the current list type reactively
  const currentListType = useEditorState({
    editor,
    selector: ctx => {
      if (ctx.editor?.isActive('bulletList')) return 'bullet';
      if (ctx.editor?.isActive('orderedList')) return 'ordered';
      return 'none';
    },
  });

  const lists = [
    {
      label: 'Bullet list',
      value: 'bullet',
      icon: ListIcon,
      onClick: () => {
        if (editor && !editor.isDestroyed) {
          editor?.chain().focus().toggleBulletList().run();
        }
      },
    },
    {
      label: 'Ordered list',
      value: 'ordered',
      icon: ListOrderedIcon,
      onClick: () => {
        if (editor && !editor.isDestroyed) {
          editor?.chain().focus().toggleOrderedList().run();
        }
      },
    },
  ];

  // Get the icon for the current list type
  const CurrentIcon = lists.find(list => list.value === currentListType)?.icon || ListIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <CurrentIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lists.map(({ label, value, icon: Icon, onClick }) => {
          return (
            <button
              key={label}
              onClick={onClick}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                currentListType === value && 'bg-neutral-200/80'
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

export default ListButton;
