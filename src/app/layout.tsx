import type { Metadata } from "next";
import RootLayoutProvider from "@/provider/RootLayoutProvider";
import { Montserrat as FontSans } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/provider/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/modules/nav-bar";

const mFont = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DAOs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mFont.className} antialiased`}>
        <WalletProvider>
          <RootLayoutProvider>
            <NavBar />
            {children}
            <Toaster />
          </RootLayoutProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
