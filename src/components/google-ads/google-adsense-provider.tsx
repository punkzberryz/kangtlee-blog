import Script from "next/script";
interface GoogleAdsenseProviderProps {
  pId: string;
}

export const GoogleAdsenseProvider = ({ pId }: GoogleAdsenseProviderProps) => {
  //   if (process.env.NODE_ENV !== "production") return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};
