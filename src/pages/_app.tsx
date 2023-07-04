import type { AppProps } from "next/app";

import { AuthProvider } from "@/context/AuthContext";

import "@/styles/globals.css";
import { SpotifyProvider } from "@/context/SpotifyContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SpotifyProvider>
        <Component {...pageProps} />
      </SpotifyProvider>
    </AuthProvider>
  );
}
