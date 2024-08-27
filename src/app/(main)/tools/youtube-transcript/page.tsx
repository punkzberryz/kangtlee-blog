import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { YoutubeTranscriptForm } from "./youtube-transcript-form";
import { Metadata } from "next";
import { config } from "@/lib/config";
import { redirect } from "next/navigation";

const YoutubeTranscriptPage = () => {
  redirect("/tools");
  // Youtube block ip...
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

const title = "FREE Youtube Transcript Extractor";
const description =
  "Extract transcript from youtube video for FREE by providing the video URL, no login required";
const imgUrl = "https://img5.pic.in.th/file/secure-sv1/transcript-extract.webp";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: ["youtube transcript extract", "youtube transcript"],
  openGraph: {
    title: { absolute: title },
    description,
    url: config.baseUrl + "/tools/youtube-transcript",
    siteName: "KangTLee",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: imgUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    title: { absolute: title },
    description,
    images: [
      {
        url: imgUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    card: "summary_large_image",
    creator: "@KangTLee1",
  },
};
