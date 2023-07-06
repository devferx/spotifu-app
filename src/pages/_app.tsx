import type { AppProps } from "next/app";

import { AuthProvider } from "@/context/AuthContext";
import { SpotifyProvider } from "@/context/SpotifyContext";

import { Layout } from "@/ui/Layout";

import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { PlayerProvider } from "@/context/PlayerContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SpotifyProvider>
        <PlayerProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PlayerProvider>
      </SpotifyProvider>
    </AuthProvider>
  );
}
