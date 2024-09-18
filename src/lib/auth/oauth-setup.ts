import { Google, Line } from "arctic";
import { config } from "../config";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID || "",
  process.env.GOOGLE_CLIENT_SECRET || "",
  `${config.baseUrl}/admin/signin/google/callback`,
);
export const line = new Line(
  process.env.LINE_CLIENT_ID || "",
  process.env.LINE_CLIENT_SECRET || "",
  `${config.baseUrl}/admin/signin/line/callback`,
);
