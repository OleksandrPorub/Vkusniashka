import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/header/TheHeader";

const globalFont = Roboto({ subsets: ["latin"], weight:["300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
    title: "Вкусняшка",
    description: "Магазин домашньої їжі",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ukr">
            <body className={globalFont.className}>
            <Header></Header>
            <main>{children}</main>
              
              </body>
        </html>
    );
}
