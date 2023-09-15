import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ShowNavbar from "@/components/navbar/ShowNavbar";

const inter = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "GadgeXhub",
    description: "Discover the Latest Gadgets: Your One-Stop Gadget Shop!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ShowNavbar>
                    <Navbar />
                </ShowNavbar>
                {children}
            </body>
        </html>
    );
}
