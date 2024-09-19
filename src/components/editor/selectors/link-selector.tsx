import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, Trash } from "lucide-react";
import { useEditor } from "novel";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (_e) {
    return false;
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (_e) {
    return null;
  }
}
interface LinkSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dofollow, setDofollow] = useState(false);
  const { editor } = useEditor();

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current?.focus();
  });
  if (!editor) return null;
  const handleCreatLink = () => {
    const input = inputRef.current?.value;
    console.log({ input });
    if (!input) return;
    const url = getUrlFromString(input);
    if (!url) {
      toast.error("Invalid URL");
      return;
    }
    if (dofollow) {
      editor.chain().focus().setLink({ href: url, rel: "noopener" }).run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
    onOpenChange(false);
    setDofollow(false);
  };
  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="gap-2 rounded-none border-none"
          type="button"
        >
          <p className="text-base">↗</p>
          <p
            className={cn("underline decoration-stone-400 underline-offset-4", {
              "text-blue-500": editor.isActive("link"),
            })}
          >
            Link
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
        <div className="flex p-1">
          <div className="flex flex-col">
            <input
              ref={inputRef}
              type="text"
              placeholder="Paste a link"
              className="flex-1 bg-background p-1 text-sm outline-none"
              defaultValue={editor.getAttributes("link").href || ""}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dofollow"
                onCheckedChange={(c) => setDofollow(c === true)}
                checked={dofollow}
              />
              <label
                htmlFor="dofollow"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Dofollow ?
              </label>
            </div>
          </div>
          {editor.getAttributes("link").href ? (
            <Button
              size="icon"
              variant="outline"
              type="button"
              className="flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                if (!inputRef.current) return;
                editor.chain().focus().unsetLink().run();
                inputRef.current.value = "";
                onOpenChange(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="icon"
              className="h-8"
              type="button"
              onClick={handleCreatLink}
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
