import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import Maintenance from "@/app/components/Maintenance";
import { WithApolloProvider } from "./providers/WithApolloProvider";
import GoogleAnalytics from "@/app/components/GoogleAnalytics/GoogleAnalytics";

export const metadata: Metadata = {
  title: "YuoVision",
  description: `YuoVisionは、動画の視聴とアップロードが可能な動画配信プラットフォームです。
    あなたの動画をアップロードして、世界中の人々と共有しましょう。新しい発見をYuoVisionでシェアし、一緒に新しい世界を探求しましょう。`,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "YuoVision",
    images: [
      {
        url: "https://yuovision.yuorei.com",
        width: 1200,
        height: 630,
        alt: "YuoVision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YuoVision",
    description:
      "YuoVisionは、動画の視聴とアップロードが可能な動画配信プラットフォームです。",
    site: "@yuovision",
    creator: "@yuorei71",
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
      </head>
      <body className="font-sans">
        <WithApolloProvider>
          <div className="flex flex-col justify-between w-full h-full min-h-screen">
            <Header />
            {isMaintenanceMode ? (
              <Maintenance />
            ) : (
              <main className="flex-auto w-full py-4 mx-auto sm:px-6 md:py-6">
                {children}
              </main>
            )}
            <Footer />
          </div>
        </WithApolloProvider>
      </body>
    </html>
  );
}
