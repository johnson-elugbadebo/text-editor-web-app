import { type ColorResult, SketchPicker } from 'react-color';
import { useEditorStore } from '@/store/use-editor-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useEditorState } from '@tiptap/react';

function TextColorButton() {
  const { editor } = useEditorStore();

  const currentFontColor = useEditorState({
    editor,
    selector: ctx => {
      return ctx.editor?.getAttributes('textStyle').color || '#000000';
    },
  });

  const handleChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='text-xs'>A</span>
          <div className='h-0.5 w-full' style={{ backgroundColor: currentFontColor }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={currentFontColor} onChange={handleChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextColorButton;
