import { type EditorState } from '../utils';
import { create } from 'zustand';

export const useEditorStore = create<EditorState>(set => ({
  editor: null,
  setEditor: editor => set({ editor }),
}));
