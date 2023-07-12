import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { SpotifyProvider } from "@/context/SpotifyContext";

import { Layout } from "@/ui/Layout";

import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SpotifyProvider>
          <PlayerProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PlayerProvider>
        </SpotifyProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
