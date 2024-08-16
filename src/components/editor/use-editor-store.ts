import { JSONContent } from "novel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EditorStoreProps {
  isUnsaved: boolean;
  charCount: number | undefined;
  setCharsCount: (count: number | undefined) => void;
  setIsUnsaved: (isUnsaved: boolean) => void;
  jsonContent: JSONContent | null;
  setJSONContent: (jsonContent: JSONContent | null) => void;
}

export const useEditorStore = create<EditorStoreProps>()(
  persist(
    (set, get) => ({
      isUnsaved: false,
      charCount: undefined,
      setCharsCount(count) {
        set({ charCount: count });
      },
      setIsUnsaved(isUnsaved) {
        set({ isUnsaved });
      },
      jsonContent: null,
      setJSONContent(jsonContent) {
        set({ jsonContent });
      },
    }),

    {
      name: "kangtlee-editor-store",
    },
  ),
);
