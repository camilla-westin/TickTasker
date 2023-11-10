import { Roboto } from "next/font/google";
import "./globals.css";
import Nav from "./(components)/Nav";
import AuthProvider from "./(components)/AuthProvider";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const roboto = Roboto({
  weight: ["300", "400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Tick Tasker",
  description: "A task manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={roboto.className}>
          <div className="flex flex-col h-screen max-h-screen">
            <Nav />
            <div className="flex-grow overflow-y-auto bg-page text-default-text">
              {children}
            </div>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
