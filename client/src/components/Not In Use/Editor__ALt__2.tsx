// import { Editor } from '@tiptap/core';
import { useEditor, EditorContent } from '@tiptap/react';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
// import { TaskList, TaskItem } from '@tiptap/extension-list';
import Link from '@tiptap/extension-link';
// import { TableKit } from '@tiptap/extension-table';
// import { TextStyle, FontFamily, Color } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
// import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import { useEditorStore } from '@/store/use-editor-store';
import { useEffect, useMemo } from 'react';
import { FontSizeExtension } from '@/extensions/font-size';
//import { Selection } from '@tiptap/extensions';
import { LineHeightExtension } from '@/extensions/line-height';
import Ruler from '@/components/Editor/Ruler';
import { useLiveblocksExtension, useIsEditorReady, FloatingComposer } from '@liveblocks/react-tiptap';
import type { AnyExtension } from '@tiptap/core';
// import { History } from '@tiptap/extension-history';
// import { useMemo } from 'react';

function EditorInstance() {
  const liveblocks = useLiveblocksExtension({ initialContent: '' });
  const isEditorReady = useIsEditorReady();
  const { setEditor } = useEditorStore();

  const editorConfig = useMemo(() => {
    if (!isEditorReady || !liveblocks) return undefined;

    return {
      editorProps: {
        attributes: {
          style: 'padding-left: 56px; padding-right: 56px',
          class:
            'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
        },
      },
      extensions: [
        ...(liveblocks ? [liveblocks as unknown as AnyExtension] : []),
        StarterKit.configure({
          // link: false, // Disable the default Link extension,
        }),

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
        // TableKit,
        // TaskList,
        // TaskItem.configure({
        //   nested: true,
        // }),
        Highlight.configure({ multicolor: true }),
        // FontFamily,
        // TextStyle,
        // Color,
      ], // define your extension array
    };
  }, [isEditorReady, liveblocks]);

  const editor = useEditor(editorConfig);
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

  if (!isEditorReady) {
    return <div>Loading collaborative editor…</div>;
  }

  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <Ruler />
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
        <FloatingComposer editor={editor} style={{ width: '350px' }} />
        {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
        {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
      </div>
    </div>
  );
}

export default EditorInstance;
