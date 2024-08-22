import { cn } from "@/lib/utils";
import { Footer } from "../footer";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { Navbar } from "./main-navbar";

export const MainLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-170px)] max-w-screen-2xl">
        <MaxWidthWrapper className={cn("py-10", className)}>
          {children}
        </MaxWidthWrapper>
      </main>
      <Footer className="py-2" />
    </>
  );
};

export * from "./main-navbar";
