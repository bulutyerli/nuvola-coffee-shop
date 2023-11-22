import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ReduxProvider } from "@/store/reduxProvider";

const merri = Merriweather_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Nuvola Coffee Shop",
  description: "Worldwide coffee shop",
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

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
