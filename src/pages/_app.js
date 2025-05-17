"use client";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ProvideChakra } from "@/Components/ui/provider";
import { store } from "../slices/store";
import Navbar from "@/Components/Navbar";
import { Footer } from "@/Components/Footer";
import "../app/globals.css";
import dotenv from "dotenv";
dotenv.config("../.env.local");
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const noOtpPages = ["/register", "/login", "/otpverify"];
  return (
    <Provider store={store}>
      <ProvideChakra>
        <Navbar />
        <Component {...pageProps} />
        {noOtpPages.includes(router.pathname) ? null : <Footer />}
      </ProvideChakra>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
