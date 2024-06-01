// src/components/ui/GambaPlayButton.tsx

import { GambaUi } from "gamba-react-ui-v2";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface GambaPlayButtonProps {
  disabled?: boolean;
  onClick: () => void;
  text: string;
}

interface GambaButtonProps {
  disabled?: boolean;
  onClick: () => void;
  text: string;
}

export const GambaButton = ({ disabled, onClick, text }: GambaButtonProps) => {
  return (
    <GambaUi.Button main disabled={disabled} onClick={onClick}>
      {text}
    </GambaUi.Button>
  );
};

const GambaPlayButton = ({ disabled, onClick, text }: GambaPlayButtonProps) => {
  const walletModal = useWalletModal();
  const wallet = useWallet();

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  return wallet.connected ? (
    <GambaUi.Button main disabled={disabled} onClick={onClick}>
      {text}
    </GambaUi.Button>
  ) : (
    <GambaUi.Button main disabled={disabled} onClick={connect}>
      {text}
    </GambaUi.Button>
  );
};

export default GambaPlayButton;
