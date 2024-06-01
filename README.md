# Gamba Degen Flip

## Quick Setup

To get started with the Gamba Demo, follow these steps:

1. **Fork and Clone the Repository**

   ```
   git clone https://github.com/BankkRoll/gamba-degen-flip.git
   cd gamba-degen-flip
   ```

2. **Install Dependencies**

   Run the following command to install the necessary dependencies:

   ```
   npm install
   ```

3. **Configure your RPC and Creator**

   - **Upload to Vercel:** For deployment, it is recommended to upload your project to [Vercel](https://vercel.com/). Ensure that you set the necessary environment variables (`NEXT_PUBLIC_RPC_ENDPOINT` and `NEXT_PUBLIC_PLATFORM_CREATOR`) in the Vercel dashboard under the project settings.

   - **Environment Variables:** If you choose to publish your env on GitHub, make sure to use environment variables securely. Rename the `.env.example` file to `.env` and update the RPC with your RPC.
     I would suggest setting up domain on helius RPC access control rules for your api key if publishing to github.

   ```bash
   ### Web3 connection
   NEXT_PUBLIC_RPC_ENDPOINT="<HELIUS API KEY>"
   ### Creator address
   NEXT_PUBLIC_PLATFORM_CREATOR="<SOLANA WALLET ADDRESS>"
   ```

4. **Configure your platform**

   Edit the [constants.ts](./src/constants.ts) and configure ALL OF YOUR INFO LINE BY LINE:

   - Platform FEEs
   - MetaTags SEO
   - Supported Tokens
   - ect.

   To add a custom token to your platform, Update/Add to the following section with your custom token's details:

   Add Public Pool 
   ```
   {
      mint: new PublicKey("So11111111111111111111111111111111111111112"),
      name: "Solana",
      symbol: "SOL",
      image: "/logo.png",
      decimals: 9,
      baseWager: 0.01e9,
   }
   ```

   Add Private Pool
   ```
   {
   mint: new PublicKey(""),
   poolAuthority: new PublicKey(""), // REQUIRED FOR PRIVATE POOLS
   name: "",
   symbol: "",
   image: "",
   decimals: 0,
   baseWager: 0,
   },
   ```

5. **Run the Application**

Start the development server:

```
npm run dev
```

Visit `http://localhost:3000` in your browser to view the app.

## Additional Information

- **Contributing**: We welcome contributions! If you have improvements or fixes, please submit a pull request and include details about your changes.
- **Acknowledgments**: Special thanks to the original [gamba platform](https://github.com/gamba-labs/platform) for the inspiration behind this project.

### License

This project is licensed under the [MIT License](LICENSE).
