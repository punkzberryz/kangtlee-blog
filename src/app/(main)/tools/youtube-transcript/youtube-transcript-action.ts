"use server";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { YoutubeTranscript } from "youtube-transcript";
export const getTranscript = async (url: string) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    return { transcript };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
