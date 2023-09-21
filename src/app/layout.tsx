import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ShowNavbar from "@/components/navbar/ShowNavbar";
import { LayoutProps } from "@/lib/types";
import ShowFooter from "@/components/footer/ShowFooter";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

const inter = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "GadgeXhub",
    description: "Discover the Latest Gadgets: Your One-Stop Gadget Shop!",
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ShowNavbar>
                    <Navbar />
                </ShowNavbar>
                {children}
                <ShowFooter>
                    <Footer />
                </ShowFooter>
                <Toaster />
            </body>
        </html>
    );
}
