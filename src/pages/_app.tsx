import type { AppProps } from "next/app";

import { AuthProvider } from "@/context/AuthContext";
import { SpotifyProvider } from "@/context/SpotifyContext";

import { Layout } from "@/ui/Layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SpotifyProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SpotifyProvider>
    </AuthProvider>
  );
}
