import { useEditorStore } from '@/store/use-editor-store';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEditorState } from '@tiptap/react';
import { useRef, useState } from 'react';

function FontSizeButton() {
  const { editor } = useEditorStore();

  // Track the current font size reactively
  const currentFontSize = useEditorState({
    editor,
    selector: ctx => {
      const fontSize = ctx.editor?.getAttributes('textStyle').fontSize;
      return fontSize ? fontSize.replace('px', '') : '16';
    },
  });

  // const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Store the editor selection when opening the input
  const selectionRef = useRef<{ from: number; to: number } | null>(null);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    console.log('updateFontSize called with:', newSize);
    console.log('Parsed size:', size);
    console.log('selectionRef.current:', selectionRef.current);

    if (!isNaN(size) && size > 0 && size <= 200) {
      // Restore the selection before applying font size
      if (selectionRef.current && editor) {
        const { from, to } = selectionRef.current;
        console.log('Restoring selection from', from, 'to', to);
        editor.chain().focus().setTextSelection({ from, to }).setFontSize(`${size}px`).run();
        selectionRef.current = null; // Clear after use
      } else {
        console.log('No stored selection, applying to current selection');
        editor?.chain().focus().setFontSize(`${size}px`).run();
      }
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(currentFontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(currentFontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className='flex items-center gap-x-0.5'>
      <button
        onClick={decrement}
        className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
        <MinusIcon className='size-4' />
      </button>
      {isEditing ? (
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className='h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0'
        />
      ) : (
        <button
          onMouseDown={e => {
            // Prevent the button click from affecting the editor selection
            e.preventDefault();

            // Store the current selection
            if (editor) {
              const { from, to } = editor.state.selection;
              selectionRef.current = { from, to };
            }

            setInputValue(currentFontSize);
            setIsEditing(true);
          }}
          className='h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text'>
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
        <PlusIcon className='size-4' />
      </button>
    </div>
  );
}

export default FontSizeButton;
