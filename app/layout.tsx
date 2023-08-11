import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthContext from "@/Context/AuthContext";
import { ThemeProvider } from "@/Context/theme-provider";
import AuthLayout from "@/Context/AuthLayout";

const inter = Inter({ subsets: ["latin"] });
const description = "Welcome to SnapLine – the vibrant hub for prompt enthusiasts and creative minds! Immerse yourself in a world of inspiration and connection as you share and explore captivating prompts. Whether you're a wordsmith, poet, or simply a lover of ideas, SnapLine offers a dynamic platform to post prompts, spark discussions, and gather a following of like-minded thinkers. Unleash your creativity, watch ideas come to life, and connect with a diverse community passionate about turning prompts into masterpieces. Join us on SnapLine and let your imagination flow!"

export const metadata: Metadata = {
  title: "SnapLine",
  description: description,
  icons: {
    icon: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthLayout>
              <Toaster />
              {props.children}
              {/* <Sidebar>
              <Navbar logo="PrompAi" />
              <div className="p-4 sm:ml-64 mt-[64px]">{props.children}</div>
              {props.modal}
            </Sidebar> */}
            </AuthLayout>
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}



