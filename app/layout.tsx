import { Toaster } from "@/src/components/ui/toaster";
import { ThemeProvider } from "@/src/components/utils/theme-provider";
import type { Metadata } from "next";

// import { Poppins } from "next/font/google";
import "./globals.css";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-poppins",
// });

export const metadata: Metadata = {
  title: "MIT timetable",
  description: "Application de gestion d'emploi du temps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={`${poppins.variable} font-poppins  antialiased`}></body> */}
      <body className={``}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
