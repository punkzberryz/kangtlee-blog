import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const FetchUserOnAuth = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense
      fallback={
        <>
          <Skeleton className="h-40" />
          <Skeleton className="h-14" />
        </>
      }
    >
      <FetchUserAsync>{children}</FetchUserAsync>
    </Suspense>
  );
};
const FetchUserAsync = async ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
