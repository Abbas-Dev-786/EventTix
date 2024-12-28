"use client";

import React, { type ReactNode } from "react";
import { wagmiAdapter, projectId } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { sepolia } from "@reown/appkit/networks";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { bellecour } from "@/lib/wagmi/bellecourChainConfig";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "Eventix",
  description: "Eventix is a platform for event management.",
  url: "https://appkitexampleapp.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [bellecour, sepolia],
  defaultNetwork: bellecour,
  metadata: metadata,
  themeVariables: {
    "--w3m-accent": "#705df6",
    "--w3m-color-mix": "#705df6",
    "--w3m-color-mix-strength": 10,
  },
  features: {
    email: true, // default to true
    socials: ["google", "x", "farcaster"],
    emailShowWallets: true, // default to true
    analytics: true, // Optional - defaults to your Cloud configuration
    onramp: false,
    swaps: false,
  },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
