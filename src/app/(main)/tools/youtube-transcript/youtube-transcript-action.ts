"use server";
import { Innertube } from "youtubei.js/web";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { YoutubeTranscript } from "youtube-transcript";
import { BadRequestError } from "@/lib/error";

export const getTranscript = async (url: string) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    return { transcript };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const getTranscriptV2 = async (url: string) => {
  const youtube = await Innertube.create({
    lang: "en",
    location: "US",
    retrieve_player: false,
  });

  try {
    const info = await youtube.getInfo(url);
    const transcriptData = await info.getTranscript();
    const content = transcriptData.transcript.content;
    if (!content) throw new BadRequestError("transcript not found");
    const body = content.body;
    if (!body) throw new BadRequestError("transcript not found");
    const transcript: string[] = [];
    body.initial_segments.forEach((segment) => {
      if (segment.snippet.text) {
        transcript.push(segment.snippet.text);
      }
    });
    return { transcript };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
