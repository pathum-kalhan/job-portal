import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "../components/NavBar";
import Provider from "../context/Provider"; 

export const metadata: Metadata = {
  title: "Career Guide Pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <Provider>
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
        </Provider>
      </html>
  );
}
