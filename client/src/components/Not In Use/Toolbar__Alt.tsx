import { cn } from '@/lib/utils';
import { type ToolbarButtonProps } from '../../utils';
import { Undo2Icon, type LucideIcon } from 'lucide-react';
// import { useEditorStore } from '@/store/user-editor-store.ts';
import { useCurrentEditor } from '@tiptap/react';

function ToolbarButton({ onClick, isActive, icon: Icon }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}>
      <Icon className='size-4' />
    </button>
  );
}

function Toolbar() {
  // const { editor } = useEditorStore();
  const { editor } = useCurrentEditor();
  // console.log({ editor });
  const sections: { label: string; icon: LucideIcon; onClick: () => void; isActive?: boolean }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => {
          if (editor) {
            editor.chain().focus().undo().run();
          }
        },
      },
    ],
  ];
  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto '>
      {sections[0].map(item => {
        return <ToolbarButton key={item.label} {...item} />;
      })}
    </div>
  );
}

export default Toolbar;
