"use client";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { extensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { MathSelector } from "./selectors/math-selector";
import { Separator } from "../ui/separator";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { suggestionItems } from "./slash-command";
import hljs from "highlight.js";
import { ToolbarBubble } from "./toolbar/toolbar";
import { generateJSON } from "@tiptap/html";
import { useEditorStore } from "./use-editor-store";
import { useIsMounted } from "@/app/hooks/use-is-mounted";
import { Skeleton } from "../ui/skeleton";

interface EditorProps {
  onUpdate: (htmlContent: string) => void;
  initialHTMLContent: string | undefined;
  blogIsNew?: boolean;
  onEditorCreate?: ({ editor }: { editor: EditorInstance }) => void;
}

export const Editor = ({
  onUpdate,
  initialHTMLContent,
  blogIsNew,
  onEditorCreate,
}: EditorProps) => {
  const {
    openNode,
    setOpenNode,
    openColor,
    setOpenColor,
    openLink,
    setOpenLink,
    initialJson,
    onEditorUpdate,
  } = useEditorState({ initialHTMLContent, onUpdate, blogIsNew });

  const { jsonContent: jsonCacheContent } = useEditorStore();

  const isMounted = useIsMounted();
  if (!isMounted) return <EditorSkeleton />;

  return (
    <EditorRoot>
      <EditorContent
        immediatelyRender={false}
        initialContent={initialJson || jsonCacheContent || undefined}
        extensions={extensions}
        className="relative min-h-[500px] border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class:
              "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
          },
        }}
        onUpdate={onEditorUpdate}
        onCreate={onEditorCreate}
        slotAfter={<ImageResizer />}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => {
                  if (!item.command) return;
                  return item.command(val);
                }}
                className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
        <ToolbarBubble>
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <MathSelector />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </ToolbarBubble>
      </EditorContent>
    </EditorRoot>
  );
};
const EditorSkeleton = () => {
  return (
    <Skeleton className="min-h-[500px] max-w-screen-lg border-muted sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg" />
  );
};
//Apply Codeblock Highlighting on the HTML from editor.getHTML()
export const highlightCodeblocks = (content: string) => {
  const doc = new DOMParser().parseFromString(content, "text/html");
  doc.querySelectorAll("pre code").forEach((el) => {
    // @ts-ignore
    // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
    hljs.highlightElement(el);
  });
  return new XMLSerializer().serializeToString(doc);
};
const useEditorState = ({
  initialHTMLContent,
  onUpdate,
  blogIsNew,
}: EditorProps) => {
  const { setCharsCount, setIsUnsaved, setJSONContent } = useEditorStore();
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  // const [openAI, setOpenAI] = useState(false);

  const initialJson = useMemo(() => {
    if (!initialHTMLContent) return;
    return generateJSON(initialHTMLContent, extensions) as JSONContent;
  }, [initialHTMLContent]);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      setCharsCount(editor.storage.characterCount.words());
      const htmlContent = highlightCodeblocks(editor.getHTML());
      onUpdate(htmlContent);
      //we only update cache if the blog is new
      if (blogIsNew) setJSONContent(editor.getJSON());
      setIsUnsaved(false);
    },
    500,
  );

  const onEditorUpdate = ({ editor }: { editor: EditorInstance }) => {
    debouncedUpdates(editor);
    setIsUnsaved(true);
  };

  return {
    initialJson,
    openNode,
    setOpenNode,
    openColor,
    setOpenColor,
    openLink,
    setOpenLink,
    onEditorUpdate,
  };
};
