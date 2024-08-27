"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getTranscript, getTranscriptV2 } from "./youtube-transcript-action";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { YtTranscript, ytTranscriptSchema } from "./youtube-transcript-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInputField } from "@/components/custom-form-fields";
import { LoadingBars } from "@/components/ui/loading-bars";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { CopyIcon } from "lucide-react";

export const YoutubeTranscriptForm = () => {
  const { handleSubmit, loading, transcript, form } =
    useYoutubeTranscriptForm();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col space-y-4"
        >
          <CustomInputField
            control={form.control}
            name="url"
            label="URL"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button type="submit" disabled={loading}>
              {loading ? <LoadingBars /> : "Extract"}
            </Button>
          </div>
        </form>
      </Form>
      <TranscriptList transcript={transcript} />
    </>
  );
};

const TranscriptList = ({ transcript }: { transcript: Transcript[] }) => {
  const handleOnCopy = () => {
    window.navigator.clipboard.writeText(
      transcript.map((t) => `${t.timestamp} ${t.text}`).join("\n"),
    );
    toast.success("Copied to clipboard");
  };
  if (transcript.length === 0) return null;
  return (
    <div className="relative flex flex-col space-y-8 pt-8">
      <Separator />
      <Button
        onClick={handleOnCopy}
        className="absolute right-0 w-fit"
        size="sm"
      >
        <CopyIcon className="h-4 w-4" />
      </Button>
      <ul className="w-fit space-y-1">
        {transcript.map((t, index) => (
          <li key={index} className="flex space-x-2">
            <p className="w-[100px] truncate font-mono text-gray-500">
              {t.timestamp}
            </p>
            <p>{t.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
const formatTimeStamp = (t: number) => {
  // format timestamp from second to hh:mm:ss
  const hours = Math.floor(t / 3600);
  const minutes = Math.floor((t % 3600) / 60);
  const seconds = Math.floor(t % 60);
  const hoursString = hours < 10 ? `0${hours}` : hours;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;
  return `${hoursString}:${minutesString}:${secondsString}`;
};

const useYoutubeTranscriptForm = () => {
  const [transcript, setTranscript] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<YtTranscript>({
    resolver: zodResolver(ytTranscriptSchema),
    defaultValues: { url: "" },
  });
  const handleSubmit = async (data: YtTranscript) => {
    setLoading(true);
    const { error, transcript } = await getTranscriptV2(data.url);
    if (error || !transcript) {
      setLoading(false);
      console.log({ error, transcript });
      setTranscript([]);
      toast.error(error?.message || "Something went wrong");
      return;
    }
    // const transformed = transformTranscript(transcript);
    // setTranscript(transformed);
    console.log({ transcript });
    toast.success("success");
    setLoading(false);
  };
  return { loading, transcript, form, handleSubmit };
};

const transformTranscript = (
  transcript: NonNullable<
    Awaited<ReturnType<typeof getTranscript>>["transcript"]
  >,
): Transcript[] => {
  const textAndTimestamp = transcript.map((t) => {
    return { text: decodeHTML(t.text), timestamp: formatTimeStamp(t.offset) };
  });
  return textAndTimestamp;
};

type Transcript = {
  text: string;
  timestamp: string;
};

const decodeHTML = (s: string) => {
  let str,
    temp = document.createElement("p");
  temp.innerHTML = s;
  str = temp.textContent || temp.innerText;

  var map = { gt: ">" /* , … */ };
  return str.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function ($0, $1) {
    if ($1[0] === "#") {
      return String.fromCharCode(
        $1[1].toLowerCase() === "x"
          ? parseInt($1.substr(2), 16)
          : parseInt($1.substr(1), 10),
      );
    } else {
      // @ts-ignore
      return map.hasOwnProperty($1) ? map[$1] : $0;
    }
  });
};
