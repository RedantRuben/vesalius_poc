import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vesalius.ai",
  description: "Your Digital Medical Assistant",
  icons: {
    icon: "/vesaliuslogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
