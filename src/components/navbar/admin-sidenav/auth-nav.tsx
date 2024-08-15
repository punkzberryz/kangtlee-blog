import { Suspense } from "react";
import { Skeleton } from "../../ui/skeleton";
import { validateRequest } from "@/lib/auth";
import { AuthButton } from "../auth-button";

export const AuthNav = () => {
  //TODO: we may need key to force re-render if there is a link to the same page with different query params
  return (
    <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full border" />}>
      <FetchUser />
    </Suspense>
  );
};

const FetchUser = async () => {
  const { user } = await validateRequest();
  if (!user) {
    // redirect("/auth/signin");
    //we handle this in page.tsx
    return null;
  }
  return <AuthButton user={user} />;
};
