// src/components/sections/Game/Game.tsx

import {
  FaBalanceScale,
  FaInfoCircle,
  FaStar,
  FaVolumeMute,
  FaVolumeUp,
  FaWeight,
  FaWeightHanging,
} from "react-icons/fa";
import { GambaUi, GameBundle, useSoundStore } from "gamba-react-ui-v2";
import React, { FC, useEffect, useMemo, useState } from "react";
import { decodeGame, getGameAddress } from "gamba-core-v2";
import {
  useAccount,
  useTransactionStore,
  useWalletAddress,
} from "gamba-react-v2";

import { Modal } from "@/components/ui/Modal";
import { ProvablyFairModal } from "./ProvablyFairModal";
import { toast } from "sonner";
import { useUserStore } from "@/hooks/useUserStore";

interface TransactionStepperProps {
  currentStep: number;
}

const TransactionStepper: FC<TransactionStepperProps> = ({ currentStep }) => {
  const steps = ["Signing", "Sending", "Settling"];

  return (
    <div className="flex justify-center">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`w-full h-2 rounded-md mx-1 flex items-center justify-center transition-all duration-300 
          ${index < currentStep ? "bg-green-500" : ""}
          ${index === currentStep ? "bg-green-700 animate-stepperPulse" : ""}
          ${index > currentStep ? "bg-gray-300" : ""}
          `}
        />
      ))}
    </div>
  );
};

function useLoadingState() {
  const userAddress = useWalletAddress();
  const game = useAccount(getGameAddress(userAddress), decodeGame);
  const txStore = useTransactionStore();

  return useMemo(() => {
    if (txStore.label !== "play") {
      return -1;
    }
    if (game?.status.resultRequested) {
      return 2;
    }
    if (txStore.state === "processing" || txStore.state === "sending") {
      return 1;
    }
    if (txStore.state === "simulating" || txStore.state === "signing") {
      return 0;
    }
    return -1;
  }, [txStore, game]);
}

export function CustomError() {
  return (
    <>
      <GambaUi.Portal target="error">
        <GambaUi.Responsive>
          <h1>😭 Oh no!</h1>
          <p>Something went wrong</p>
        </GambaUi.Responsive>
      </GambaUi.Portal>
    </>
  );
}

export default function CustomRenderer() {
  const { game } = GambaUi.useGame();
  const [info, setInfo] = useState(false);
  const [provablyFair, setProvablyFair] = useState(false);
  const audioStore = useSoundStore();
  const imagePath = `/games/${game.id}/logo.png`;
  const { newcomer, gamesPlayed, set } = useUserStore();
  const currentStep = useLoadingState();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (newcomer || !gamesPlayed.includes(game.id)) {
      setInfo(true);
      set((state) => ({
        newcomer: false,
        gamesPlayed: [...state.gamesPlayed, game.id],
      }));
    }
  }, [game.id, gamesPlayed, newcomer, set]);

  return (
    <>
      {info && (
        <Modal onClose={() => setInfo(false)}>
          <img height="150px" src={imagePath} alt={`${game.meta.name}`} />
        </Modal>
      )}
      {provablyFair && (
        <ProvablyFairModal onClose={() => setProvablyFair(false)} />
      )}
      <div className="relative grid w-full gap-1">
        {showSplash && (
          <div className="pointer-events-none rounded-lg absolute inset-0 flex justify-center items-center z-10 text-6xl font-bold animate-[splashAnimation_1s_ease-out_forwards]">
            <img
              height="150px"
              src={imagePath}
              alt={`Splash for ${game.meta.name}`}
            />
          </div>
        )}
        <div className="relative flex flex-col justify-between pb-20 text-white rounded-lg game-background lg:flex-row">
          {/* Controls */}
          <div className="order-last p-4 m-2 overflow-hidden duration-200 rounded-lg game-foreground transition-height min-h-32 md:min-h-auto md:w-1/1 lg:w-2/5 lg:order-first">
            <div className="flex flex-col justify-between h-full gap-2">
              <div className="flex flex-col gap-2">
                <GambaUi.PortalTarget target="controls" />
                <GambaUi.PortalTarget target="play" />
              </div>
            </div>
          </div>
          {/* Game */}
          <div className="game-foreground rounded-lg overflow-hidden transition-height duration-200 h-[400px] md:h-[600px] m-2 lg:w-full">
            <GambaUi.PortalTarget target="screen" />
            <GambaUi.PortalTarget target="error" />
          </div>

          <div className="absolute bottom-0 w-full p-2 overflow-hidden duration-200 rounded-b-lg game-foreground transition-height">
            <div className="relative flex flex-wrap gap-2">
              <div className="w-full">
                <TransactionStepper currentStep={currentStep} />
              </div>
              <div className="flex justify-center gap-2">
                <div className="flex justify-center gap-2">
                  <button
                    className="p-2 text-white bg-transparent hover:bg-[#ffffff22] rounded-lg cursor-pointer focus:outline-none"
                    onClick={() => setInfo(true)}
                  >
                    <FaInfoCircle className="w-6 h-6" />
                  </button>
                  <button
                    className="p-2 text-white bg-transparent hover:bg-[#ffffff22] rounded-lg cursor-pointer focus:outline-none"
                    onClick={() => setProvablyFair(true)}
                  >
                    <FaBalanceScale className="w-6 h-6" />
                  </button>
                </div>
                <button
                  className="p-2 text-white bg-transparent hover:bg-[#ffffff22] rounded-lg cursor-pointer focus:outline-none"
                  onClick={() => {
                    const newVolume = audioStore.volume === 0 ? 1 : 0;
                    audioStore.set(newVolume);
                    newVolume === 0
                      ? toast.error("Muted")
                      : toast.success("Unmuted");
                  }}
                >
                  {audioStore.volume === 0 ? (
                    <>
                      <FaVolumeMute className="w-6 h-6" />
                    </>
                  ) : (
                    <>
                      <FaVolumeUp className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
