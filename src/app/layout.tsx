import type { Metadata } from "next";
import "./globals.css";
import {NavBar} from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Career Guid Pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <NavBar />
        </header>
        <main
          style={{
            paddingTop: "2rem",
            paddingBottom: "5rem",
            minHeight:"100vh",
            maxHeight:"100%",
            backgroundColor: "#f0f0f0",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
