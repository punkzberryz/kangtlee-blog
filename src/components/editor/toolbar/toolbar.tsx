"use client";

import { EditorBubble, useEditor } from "novel";
import { removeAIHighlight } from "novel/extensions";
import { ReactNode, useEffect } from "react";

interface ToolbarBubbleProps {
  children: ReactNode;
}
export const ToolbarBubble = ({ children }: ToolbarBubbleProps) => {
  const { editor } = useEditor();

  return (
    <EditorBubble
      tippyOptions={{
        placement: "top",
        onHidden: () => editor?.chain().unsetHighlight().run(),
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {children}
    </EditorBubble>
  );
};
