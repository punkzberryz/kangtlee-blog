"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { toast } from "react-toastify";
import { createPost } from "./post-action";
import { usePostStore } from "@/app/hooks/use-post-store";

export const NewBlogClient = () => {
  const {
    post: { htmlContent },
  } = usePostStore();
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!titleRef.current) {
      return;
    }
    const title = titleRef.current.value;

    if (title === "") {
      toast.error("Title cannot be empty");
      return;
    }
    //replace space with dash and remove special characters
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    if (htmlContent === "") {
      toast.error("Content not found");
      return;
    }
    const { error, post } = await createPost({
      data: {
        published: true,
        content: htmlContent,
        slug,
        title,
      },
    });
    console.log({ error, post });
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(`Post created with id: ${post?.id}`);
  };
  return (
    <div>
      <div className="flex items-center space-x-2">
        <p>Title</p>
        <Input ref={titleRef} />
      </div>

      <div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};
