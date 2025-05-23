import type { Metadata } from "next";
import "./globals.css";
import { ProvideChakra} from "../Components/ui/provider.tsx";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      >
        {" "}
        <ProvideChakra>{children}</ProvideChakra>
      </body>
    </html>
  );
}
