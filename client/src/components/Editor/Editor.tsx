// import { Editor } from '@tiptap/core';
import { useEditor, EditorContent } from '@tiptap/react';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
// import { TaskList, TaskItem } from '@tiptap/extension-list';

import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

import Link from '@tiptap/extension-link';
// import { TableKit } from '@tiptap/extension-table';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

// import { TextStyle, FontFamily, Color } from '@tiptap/extension-text-style';
import TextStyle from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
// import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import { useEditorStore } from '@/store/use-editor-store';
import { useEffect } from 'react';
import { FontSizeExtension } from '@/extensions/font-size';
// import Selection from '@tiptap/extension-gapcursor';
import { LineHeightExtension } from '@/extensions/line-height';
import Ruler from '@/components/Editor/Ruler';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import Threads from '@/components/Editor/Threads';
// import type { AnyExtension } from '@tiptap/core';
// import { History } from '@tiptap/extension-history';
// import { useMemo } from 'react';
import Underline from '@tiptap/extension-underline';
import { useStorage } from '@liveblocks/react';
import { DEFAULT_MARGIN } from '@/constants/margins';

function EditorInstance({ initialContent }: { initialContent?: string }) {
  const leftMargin = useStorage(root => root.leftMargin);
  const rightMargin = useStorage(root => root.rightMargin);

  const liveblocks = useLiveblocksExtension({ initialContent: initialContent ?? undefined });
  // const isEditorReady = useIsEditorReady();
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    autofocus: true,
    editorProps: {
      attributes: {
        style: `padding-left: ${(leftMargin ?? DEFAULT_MARGIN) as number}px; padding-right: ${(rightMargin ?? DEFAULT_MARGIN) as number}px`,
        class:
          'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 cursor-text',
      },
    },
    extensions: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      liveblocks as any,
      StarterKit.configure({
        history: false, // Disable the default Link extension,
      }),
      Underline,
      ImageResize,
      FontSizeExtension,
      LineHeightExtension,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      // Selection.configure({
      //   className: 'selection', // Custom class name
      // }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight.configure({ multicolor: true }),
      FontFamily,
      TextStyle,
      Color,
    ], // define your extension array
    immediatelyRender: false,
  });

  // Memoize the provider value to avoid unnecessary re-renders
  // const providerValue = useMemo(() => ({ editor }), [editor]);

  // Use useEffect to set editor in store after it's created
  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
    // Cleanup: remove editor from store when component unmounts
    return () => {
      setEditor(null);
    };
  }, [editor, setEditor]);

  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] print:p-0 print:bg-white print:overflow-visible'>
      <Ruler />
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <>
          <EditorContent editor={editor} />
          <Threads editor={editor} />
          {/* <FloatingComposer editor={editor} style={{ width: '350px' }} /> */}
          {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
          {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
        </>
      </div>
    </div>
  );
}

export default EditorInstance;
