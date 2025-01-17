import type { Metadata } from "next";
import NavBar from "@/components/modules/nav-bar";

export const metadata: Metadata = {
  title: "Welcome",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
