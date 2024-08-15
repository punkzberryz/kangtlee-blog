import "@/styles/globals.css";
import "@/styles/prosemirror.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { config } from "@/lib/config";
import QueryProvider from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | KangTLee Blog",
    default: "KangTLee Blog",
  },
  description: "A blog about software development, programming, and lifestyle.",
  metadataBase: new URL(config.baseUrl + "/"),
  icons: "/logo.png",
  openGraph: {
    title: "KangTLee Blog",
    description:
      "A blog about software development, programming, and lifestyle.",
    url: config.baseUrl,
    siteName: "KangTLee Blog",
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
