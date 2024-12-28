import { defineChain } from "@reown/appkit/networks";

export const bellecour = defineChain({
  id: 134,
  caipNetworkId: "eip155:1337",
  chainNamespace: "eip155",
  name: "iExec Sidechain",
  nativeCurrency: {
    decimals: 18,
    name: "xRLC",
    symbol: "xRLC",
  },
  rpcUrls: {
    public: { http: ["https://bellecour.iex.ec"] },
    default: { http: ["https://bellecour.iex.ec"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Blockscout",
      url: "https://blockscout-bellecour.iex.ec",
    },
    default: { name: "Blockscout", url: "https://blockscout-bellecour.iex.ec" },
  },
});
