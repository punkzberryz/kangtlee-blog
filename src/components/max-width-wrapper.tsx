import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const MaxWidthWrapper = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return <div className={cn("px-2.5 md:px-20", className)}>{children}</div>;
};

export const CancelMaxWidthWrapper = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return <div className={cn("-mx-2.5 md:-mx-20", className)}>{children}</div>;
};
