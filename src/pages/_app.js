"use client";
import { ToastContainer } from "react-toastify";
import React from "react";
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
  return (
    <div className="animated-bg">
      <React.StrictMode>
        <Provider store={store}>
          <ProvideChakra>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </ProvideChakra>
          <ToastContainer />
        </Provider>
      </React.StrictMode>
    </div>
  );
}

export default MyApp;
