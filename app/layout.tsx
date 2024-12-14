import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TanstackQueryProvider } from "@/src/components/providers/TanstackQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Production Manager",
    default: "Production Manager",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            stacked={true}
            bodyClassName="text-xs font-bold text-black"
          />
          <TanstackQueryProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </TanstackQueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
