import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { YoutubeTranscriptForm } from "./youtube-transcript-form";
import { Metadata } from "next";

const YoutubeTranscriptPage = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Card>
        <CardHeader>
          <h1>Youtube Transcript Extractor</h1>
          <CardDescription>
            Extract transcript from youtube video for FREE by providing the
            video URL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <YoutubeTranscriptForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default YoutubeTranscriptPage;
export const metadata: Metadata = {
  title: {
    absolute: "FREE Youtube Transcript Extractor",
  },
  description:
    "Extract transcript from youtube video for FREE by providing the video URL, no login required",
};
