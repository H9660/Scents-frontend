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
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <ProvideChakra>
        <div className="flex flex-col min-h-screen">
          {router.pathname !== "/checkout" && <Navbar />}
          <Component {...pageProps} />
          {router.pathname !== "/checkout" && <Footer />}
        </div>
      </ProvideChakra>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
