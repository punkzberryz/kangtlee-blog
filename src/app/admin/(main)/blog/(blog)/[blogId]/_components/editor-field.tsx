"use client";

import { UseFormReturn } from "react-hook-form";
import { PostSchema } from "../../_components/post-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Editor,
  EditorStatus,
  highlightCodeblocks,
  useEditorStore,
} from "@/components/editor";
import { EditorInstance } from "novel";

interface EditorFieldProps {
  form: UseFormReturn<PostSchema>;
  isNew?: boolean;
  initialContent?: string;
}
export const EditorField = ({
  form,
  isNew,
  initialContent,
}: EditorFieldProps) => {
  const { setCharsCount } = useEditorStore();
  const handleOnEditorCreate = ({ editor }: { editor: EditorInstance }) => {
    //update form value when editor is created
    const htmlContent = highlightCodeblocks(editor.getHTML());
    setCharsCount(editor.storage.characterCount.words());
    form.setValue("htmlContent", htmlContent);
  };

  return (
    <FormField
      control={form.control}
      name="htmlContent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Body</FormLabel>
          <FormMessage />
          <div className="relative w-full max-w-screen-lg">
            <EditorStatus blogIsNew={isNew} />
            <FormControl>
              <Editor
                onUpdate={field.onChange}
                initialHTMLContent={initialContent}
                blogIsNew={isNew}
                onEditorCreate={handleOnEditorCreate}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};
