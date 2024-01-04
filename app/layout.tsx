import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/header/TheHeader";
import { Providers } from "./components/Providers";
// import { SessionProvider } from "next-auth/react";

const globalFont = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
    title: "Вкусняшка",
    description: "Магазин домашньої їжі",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ukr">
            <body className={globalFont.className}>
                {/* <SessionProvider> */}
                <Providers>
                    <Header />
                    <main>{children}</main>
                {/* </SessionProvider> */}
                </Providers>
            </body>
        </html>
    );
}
