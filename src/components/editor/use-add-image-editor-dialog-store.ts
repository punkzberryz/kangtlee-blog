import { EditorInstance } from "novel";
import { create } from "zustand";

interface AddImageEditorDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const useAddImageEditorDialog = create<AddImageEditorDialogProps>(
  (set, get) => ({
    open: false,
    setOpen(open) {
      set({ open });
    },
  }),
);
