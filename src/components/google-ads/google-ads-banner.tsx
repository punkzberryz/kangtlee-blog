"use client";
import { useEffect } from "react";

interface GoogleAdsBannerProps {
  pId: string;
  dataAdSlot: string;
  dataAdFormat: string;
  defaultWidthResponsive: boolean;
}
export const GoogleAdsBanner = ({
  pId,
  dataAdFormat,
  dataAdSlot,
  defaultWidthResponsive,
}: GoogleAdsBannerProps) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      );
    } catch (err: any) {
      console.log(err.message);
    }
  }),
    [];
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={pId}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={defaultWidthResponsive.toString()}
    ></ins>
  );
};
