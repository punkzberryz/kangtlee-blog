"use client";

import { useAuthStore } from "@/app/hooks/use-auth-store";
import { useQuery } from "@tanstack/react-query";
import { fetchMeAction } from "./fetch-me-action";
import { AuthButton } from "./auth-button";

export const AuthNavClient = () => {
  const { setUser, user } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ["fetchMeAction"],
    queryFn: async () => {
      const { user } = await fetchMeAction();
      setUser(user);
      return null;
    },
    refetchInterval: 1000 * 60 * 60, // 1 hour
  });
  if (isLoading) return null;
  if (!user) return null;
  return <AuthButton user={user} />;
};
