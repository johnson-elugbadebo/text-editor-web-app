import { type ColorResult, SketchPicker } from 'react-color';
import { useEditorStore } from '@/store/use-editor-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HighlighterIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';

function HighlightColorButton() {
  const { editor } = useEditorStore();

  const currentHighlightColor = useEditorState({
    editor,
    selector: ctx => {
      return ctx.editor?.getAttributes('highlight').color || '#FFFFFF';
    },
  });

  const handleChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <HighlighterIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={currentHighlightColor} onChange={handleChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HighlightColorButton;
