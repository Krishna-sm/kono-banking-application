import { Geist, Geist_Mono,Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const PoppinsFont= Poppins({
  variable:'--font-poppins',
  subsets: ["latin"],
  weight:'400'

})

export const metadata = {
  title: "Kono Banking Application",
  description: "A Bank for childrens and Program ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`  ${PoppinsFont.variable}   `}
        suppressHydrationWarning
      >
        <MainLayout>

        {children}
        </MainLayout>
      </body>
    </html>
  );
}
