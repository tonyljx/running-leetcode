import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

// const inter = Inter({ subsets: ["latin"] });
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "RunningCode",
  description: "按类型收录牛客101 | leetcode hot 100 | 剑指 offer全部题目",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AntdRegistry>
          {/* 定制主题 */}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#597ef7",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
