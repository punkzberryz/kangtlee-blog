"use client";

import { Button } from "@/components/ui/button";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "react-toastify";
import { generateHTML } from "@tiptap/html";
import { defaultExtensions } from "@/components/editor/extensions";
import { slashCommand } from "@/components/editor/slash-command";
import { cn } from "@/lib/utils";
import { usePostStore } from "@/app/hooks/use-post-store";
export const UploadNewBlog = () => {
  const [content, setContent] = useState<string>("");
  const [content2, setContent2] = useState<string>("");
  const { post } = usePostStore();
  const handleOnClick = async () => {
    //get editor content from local storage
    const jsonString = window.localStorage.getItem("novel-content");
    const htmlString = window.localStorage.getItem("html-content");
    //parse the json string to json object
    if (!jsonString) {
      toast.error("No content found in editor");
      return;
    }
    const json = JSON.parse(jsonString) as JSONContent;
    //parse to html
    const html = generateHTML(json, [...defaultExtensions, slashCommand]);
    setContent(html);
    setContent2(post.htmlContent || "");
  };
  return (
    <div>
      <Button onClick={handleOnClick}>Show content</Button>;
      <div className="mt-10">
        <div
          dangerouslySetInnerHTML={{ __html: content2 }}
          className={cn(
            "ProseMirror",
            "relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg",
            "prose prose-lg dark:prose-invert prose-headings:font-title font-default max-w-full focus:outline-none",
          )}
        />
      </div>
    </div>
  );
};
