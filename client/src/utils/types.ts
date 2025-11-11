import type { LucideIcon } from 'lucide-react';
import { type Editor } from '@tiptap/react';
import { type PaginationStatus } from 'convex/react';
// import { type Doc, type Id } from '../../convex/_generated/dataModel';
import type { Doc, Id } from 'convex/_generated/dataModel';
import { type Preloaded } from 'convex/react';
import type { api } from 'convex/_generated/api';

export interface DocumentIDPageProps {
  params: Promise<{ documentId: string }>;
}

export interface DocumentsLayoutProps {
  children: React.ReactNode;
}

export interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

export interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

export interface FullScreenLoaderProps {
  label?: string;
}

export interface DocumentsTableProps {
  documents: Doc<'documents'>[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export interface DocumentRowProps {
  document: Doc<'documents'>;
}

export interface DocumentMenuProps {
  documentId: Id<'documents'>;
  title: string;
  onNewTab: (id: Id<'documents'>) => void;
}

export interface RemoveDialogProps {
  documentId: Id<'documents'>;
  children: React.ReactNode;
}

export interface RenameDialogProps {
  documentId: Id<'documents'>;
  initialTitle: string;
  children: React.ReactNode;
}

export type User = {
  id: string;
  name: string;
  avatar: string | undefined;
  color: string;
};

export interface AvatarProps {
  src: string;
  name: string;
}

export interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getDocumentById>;
}

export interface NavbarProps {
  data: Doc<'documents'>;
}

export interface DocumentInputProps {
  title: string;
  id: Id<'documents'>;
}
