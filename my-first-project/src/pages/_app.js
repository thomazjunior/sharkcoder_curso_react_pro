import Layout from "@/components/layout";
import "@/styles/globals.css";
import { AlunosProvider } from "../context/AlunosContext";

export default function App({ Component, pageProps }) {
  return (
    <AlunosProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AlunosProvider>
  );
}
