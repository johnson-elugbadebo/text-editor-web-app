import { cn } from '@/lib/utils';
import { type ToolbarButtonProps } from '../../utils';
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  type LucideIcon,
} from 'lucide-react';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import { useEditorState } from '@tiptap/react';
import FontFamilyButton from '@/components/Editor/FontFamilyButton';
import HeadingLevelButton from '@/components/Editor/HeadingLevelButton';
import TextColorButton from '@/components/Editor/TextColorButton';
import HighlightColorButton from '@/components/Editor/HighlightColorButton';
import LinkButton from '@/components/Editor/LinkButton';
import ImageButton from '@/components/Editor/ImageButton';
import AlignButton from '@/components/Editor/AlignButton';
import ListButton from '@/components/Editor/ListButton';
import FontSizeButton from '@/components/Editor/FontSizeButton';
import LineHeightButton from '@/components/Editor/LineHeightButton';

// import { useCurrentEditor } from '@tiptap/react';

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
  const { editor } = useEditorStore();
  // const { editor } = useCurrentEditor();
  // console.log('Toolbar editor: ', { editor });

  // This efficiently tracks only the specific state you need
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor?.isActive('bold') ?? false,
        isItalic: ctx.editor?.isActive('italic') ?? false,
        isUnderline: ctx.editor?.isActive('underline') ?? false,
        isTasklist: ctx.editor?.isActive('taskList') ?? false,
        isComment: ctx.editor?.isActive('liveblocksCommentMark') ?? false, // Add this
      };
    },
  });

  const sections: { label: string; icon: LucideIcon; onClick: () => void; isActive?: boolean }[][] = [
    // Section 0 toolbar items
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => {
          // console.log('Undo clicked');
          // console.log('Editor exists:', !!editor);
          // console.log('Editor destroyed:', editor?.isDestroyed);
          // console.log('Can undo:', editor?.can().undo());

          if (editor && !editor.isDestroyed) {
            // Try the chain approach without focus
            // const result = editor.chain().undo().run();
            // console.log('Undo result:', result);
            editor.chain().focus().undo().run();
          }
        },
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => {
          if (editor && !editor.isDestroyed) {
            editor.chain().focus().redo().run();
          }
        },
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => {
          if (editor && !editor.isDestroyed) {
            window.print();
          }
        },
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          if (editor && !editor.isDestroyed) {
            const current = editor.view.dom.getAttribute('spellcheck');
            editor.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false');
          }
        },
      },
    ],
    // Section 1 toolbar items
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editorState?.isBold,
        onClick: () => {
          if (editor && !editor.isDestroyed) {
            editor.chain().focus().toggleBold().run();
          }
        },
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editorState?.isItalic,
        onClick: () => {
          if (editor && !editor.isDestroyed) {
            editor.chain().focus().toggleItalic().run();
          }
        },
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editorState?.isUnderline,
        onClick: () => {
          if (editor && !editor.isDestroyed) {
            editor.chain().focus().toggleUnderline().run();
          }
        },
      },
    ],
    // Section 2 toolbar items
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        isActive: editorState?.isComment,
        onClick: () => {
          if (editor && !editor.isDestroyed) {
            editor?.chain().focus().addPendingComment().run();
          }
        },
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        isActive: editorState?.isTasklist,
        onClick: () => {
          if (editor && !editor.isDestroyed) {
            editor.chain().focus().toggleTaskList().run();
          }
        },
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () => {
          if (editor && !editor.isDestroyed) {
            editor.chain().focus().unsetAllMarks().run();
          }
        },
      },
    ],
  ];
  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto '>
      {/* Section 1 */}
      {sections[0].map(item => {
        return <ToolbarButton key={item.label} {...item} />;
      })}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontSizeButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[1].map(item => {
        return <ToolbarButton key={item.label} {...item} />;
      })}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[2].map(item => {
        return <ToolbarButton key={item.label} {...item} />;
      })}
    </div>
  );
}

export default Toolbar;
