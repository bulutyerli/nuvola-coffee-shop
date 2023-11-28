import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ReduxProvider } from "@/store/reduxProvider";
import { getServerSession } from "@/lib/serverAuth";

const merri = Merriweather_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Nuvola Coffee Shop",
  description: "Worldwide coffee shop",
};

export default async function RootLayout({ children }) {
  const { session } = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${merri.className} bg-primary flex flex-col min-h-screen`}
      >
        <ReduxProvider>
          <Header session={session} />
          {children}
        </ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
