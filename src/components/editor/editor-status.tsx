import { useEditorStore } from "./use-editor-store";

export const EditorStatus = ({ blogIsNew }: { blogIsNew?: boolean }) => {
  const { charCount, isUnsaved } = useEditorStore();
  return (
    <div className="absolute right-5 top-5 z-10 mb-5 flex gap-2">
      {blogIsNew ? (
        //save status in only for local-storage, so we only show if the blog is new
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {isUnsaved ? "Unsaved" : "Saved"}
        </div>
      ) : null}
      <div
        className={
          charCount
            ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
            : "hidden"
        }
      >
        {charCount} Words
      </div>
    </div>
  );
};
