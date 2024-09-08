import { config } from "@/lib/config";
import { Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: `${config.baseUrl}/fonts/Roboto/Roboto-Regular.ttf`,
      fontStyle: "normal",
    },
  ],
});

Font.register({
  family: "Kanit",
  fonts: [
    {
      src: `${config.baseUrl}/fonts/Kanit/Kanit-Regular.ttf`,
      fontStyle: "normal",
    },
    {
      src: `${config.baseUrl}/fonts/Kanit/Kanit-SemiBold.ttf`,
      fontWeight: 600,
    },
  ],
});
// The 'theme' object is your Tailwind theme config
export const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Kanit"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});
