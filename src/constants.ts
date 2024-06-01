// src\constants.ts
import { PublicKey } from "@solana/web3.js";

// Platform fees
export const PLATFORM_CREATOR_FEE = 0.05; // 5%
export const PLATFORM_JACKPOT_FEE = 0.01; // 1%

// Toggle live toast events - (true = on, false = off)
export const LIVE_EVENT_TOAST = true;

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │          METATAGS (SEO)              │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

export const BASE_SEO_CONFIG = {
  defaultTitle: "Gamba Degen Flip",
  description:
    "The gambleFi protocol with end-to-end tools for on-chain degeneracy on Solana.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gamba-degen-flip.vercel.app/",
    title: "Gamba Degen Flip",
    description:
      "The gambleFi protocol with end-to-end tools for on-chain degeneracy on Solana.",
    images: [
      {
        url: "https://gamba-degen-flip.vercel.app/seo.png",
        alt: "Gamba Degen Flip",
      },
    ],
    site_name: "Gamba Degen Flip",
  },
  twitter: {
    cardType: "summary_large_image",
    site: "https://twitter.com/gambalabs",
    handle: "@gambalabs",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "casino, gaming, rewards, gambling, entertainment",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
  ],
};

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │      SUPPORTED PLATFORM TOKENS       │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

export const TOKENLIST = [
  // SOL
  {
    mint: new PublicKey("So11111111111111111111111111111111111111112"),
    name: "Solana",
    symbol: "SOL",
    image:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    decimals: 9,
    baseWager: 0.01e9,
  },
  // USDC
  {
    mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    name: "USD Coin",
    symbol: "USDC",
    image:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    decimals: 9,
    baseWager: 0.01e9,
  },
  // GUAC
  {
    mint: new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"),
    name: "Guacamole",
    symbol: "GUAC",
    image:
      "https://bafkreiccbqs4jty2yjvuxp5x7gzgepquvv657ttauaqgxfhxghuz5us54u.ipfs.nftstorage.link/",
    decimals: 5,
    baseWager: 2000000e5,
  },
  // JUP
  {
    mint: new PublicKey("JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"),
    name: "Jupiter",
    symbol: "JUP",
    image: "https://static.jup.ag/jup/icon.png",
    decimals: 6,
    baseWager: 1e6,
  },
  // BONK
  {
    mint: new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"),
    name: "Bonk",
    symbol: "BONK",
    image: "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
    decimals: 5,
    baseWager: 100000e5,
  },
  // FRONK
  {
    mint: new PublicKey("5yxNbU8DgYJZNi3mPD9rs4XLh9ckXrhPjJ5VCujUWg5H"),
    name: "Fronk",
    symbol: "FRONK",
    image:
      "https://shdw-drive.genesysgo.net/8tfWzweVe7MAfi8qwiKFnzLq6wuLT7WAPMoQC7DH47Fq/fronk.png",
    decimals: 5,
    baseWager: 20000000e5,
  },
  // W
  {
    mint: new PublicKey("85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ"),
    name: "Wormhole",
    symbol: "W",
    image: "https://wormhole.com/token.png",
    decimals: 6,
    baseWager: 1e6,
  },
];
