import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingBarComponent from "@/components/Loadingbar";
import  { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import store from "@/Store/store";

export default function App({ Component, pageProps }: AppProps) {
 return (
    <>
    <Provider store={store}>
      <LoadingBarComponent/>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
      <Footer/>
      </Provider>
    </>
  );
}
