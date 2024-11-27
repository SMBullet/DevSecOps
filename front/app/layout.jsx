import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"], variable: '--font-poppins' });

export const metadata = {
  title: "PFE Maroc",
  description: "Project Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}