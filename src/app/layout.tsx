import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ShowNavbar from "@/components/navbar/show-navbar";
import { LayoutProps } from "@/lib/types/types";
import ShowFooter from "@/components/footer/show-footer";
import Footer from "@/components/footer/footer";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GadgeXhub",
  description: "Discover the Latest Gadgets: Your One-Stop Gadget Shop!",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ShowNavbar>
            <Navbar />
          </ShowNavbar>
          {children}
          <ShowFooter>
            <Footer />
          </ShowFooter>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
