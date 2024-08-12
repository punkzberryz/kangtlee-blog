"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
interface TiptapProps {
  content?: string;
}
export const Tiptap = ({ content }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
    autofocus: true,
    editable: true,
  });
  const text = editor?.getText();
  return (
    <div>
      {editor && (
        <BubbleMenu editor={editor} pluginKey="bubbleMenu">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        className="h-full bg-blue-50"
        content={content}
      />
      <div>{text}</div>
    </div>
  );
};
