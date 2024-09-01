"use client";
import { CustomCheckboxField } from "@/components/custom-form-fields/custom-checkbox-field";
import {
  FileWithUrl,
  ImageInput,
} from "@/components/image-input/image-input-ui";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { removeBackground } from "@imgly/background-removal";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
export const Client = () => {
  const {
    form,
    handleSubmit,
    progress,
    progressText,
    imgState,
    onImageInputChange,
    isSuccess,
  } = useBackgroundRemove();

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageInput
                    id="url"
                    maxFileSize={1024 * 1024 * 500}
                    imageState={imgState}
                    onInputChange={onImageInputChange}
                    loadingChildren={
                      <div className="flex flex-col items-center space-y-4 rounded bg-primary/20 p-4">
                        <p className="animate-bounce text-lg font-semibold">
                          {progressText}
                        </p>
                        <Progress value={progress} className="w-[60%]" />
                      </div>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="rounded border p-4">
            <CustomCheckboxField
              control={form.control}
              name="useGpu"
              label="ใช้ GPU"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button disabled={imgState?.isLoading}>ลบพื้นหลัง</Button>
            {isSuccess && (
              <Button variant="secondary">
                <a href={imgState?.getUrl} download>
                  <DownloadIcon className="mr-1 inline-block" /> ดาวน์โหลด
                </a>
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
const useBackgroundRemove = () => {
  const [progressText, setProgressText] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [imgState, setImgState] = useState<FileWithUrl | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<BackgroundRemove>({
    resolver: zodResolver(backgroundRemoveSchema),
    defaultValues: {
      useGpu: false,
    },
  });
  const onImageInputChange = ({
    isValid,
    file,
  }: {
    file: File;
    isValid: boolean;
  }) => {
    if (!isValid) {
      toast.error("รูปภาพไม่ถูกต้อง");
      return;
    }
    setIsSuccess(false);
    const url = URL.createObjectURL(file);
    setImgState({
      getUrl: url,
      name: file.name,
      isError: false,
      isLoading: false,
    });
    form.setValue("url", url);
  };
  const handleSubmit = async (data: BackgroundRemove) => {
    setImgState({
      getUrl: data.url,
      name: "image",
      isError: false,
      isLoading: true,
    });
    setProgressText(undefined);
    setProgress(0);
    //remove background
    try {
      const file = await fetch(data.url).then((res) => res.blob());
      const result = await removeBackground(file, {
        device: data.useGpu ? "gpu" : "cpu",
        progress: (key, current, total) => {
          console.log(`Downloading ${key}: ${current} of ${total}`);
          const p = (current / total) * 100;
          setProgressText(`${key}: ${p.toFixed(2)}%`);
          setProgress(p);
        },
      });
      //blob to url
      const url = URL.createObjectURL(result);
      setImgState({
        getUrl: url,
        name: "removed-background-image",
        isError: false,
        isLoading: false,
      });
      toast.success("ลบพื้นหลังเสร็จสิ้น");
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาด");
      setImgState({
        getUrl: data.url,
        name: "image",
        isError: true,
        isLoading: false,
      });
    }
  };
  return {
    progress,
    progressText,
    form,
    handleSubmit,
    imgState,
    onImageInputChange,
    isSuccess,
  };
};
const backgroundRemoveSchema = z.object({
  url: z.string(),
  useGpu: z.boolean(),
});
type BackgroundRemove = z.infer<typeof backgroundRemoveSchema>;
