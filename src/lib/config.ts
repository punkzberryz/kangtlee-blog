export const config = {
  projectName: "kangtlee-blog",
  baseUrl: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  signUpAdminSecret: process.env.SIGNUP_ADMIN_SECRET,
  cloudinary: {
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  },
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "",
};

export const COOKIE_NAME = `${config.projectName}-session`;
