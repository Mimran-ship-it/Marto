import type { Metadata } from "next";
import { Caveat, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreProvider } from "@/lib/store-context";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "MARTO — Fresh Groceries, Fast Delivery in Sahiwal",
    template: "%s | MARTO",
  },
  description:
    "Sahiwal's trusted online grocery store. Fresh fruits, vegetables, dairy & daily essentials delivered fast.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${caveat.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-foreground antialiased">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
