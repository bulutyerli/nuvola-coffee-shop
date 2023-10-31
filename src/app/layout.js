import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const merri = Merriweather_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Nuvola Coffee Shop",
  description: "Worldwide coffee shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="bg-primary  " className={merri.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
