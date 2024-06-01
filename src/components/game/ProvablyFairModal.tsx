// src/components/sections/Game/ProvablyFairModal.tsx

import { GambaPlatformContext, GambaUi } from "gamba-react-ui-v2";
import React, { useContext } from "react";
import { useGamba, useGambaProgram, useSendTransaction } from "gamba-react-v2";

import { FaShuffle } from "react-icons/fa6";
import GambaPlayButton from "@/components/ui/GambaPlayButton";
import { Modal } from "@/components/ui/Modal";

export function ProvablyFairModal(props: { onClose: () => void }) {
  const gamba = useGamba();
  const platform = useContext(GambaPlatformContext);
  const program = useGambaProgram();
  const sendTransaction = useSendTransaction();

  const initialize = async () => {
    sendTransaction(
      program.methods.playerInitialize().accounts({}).instruction()
    );
  };

  return (
    <Modal onClose={() => props.onClose()}>
      <h1 className="text-2xl font-bold">Provably Fair</h1>
      {!gamba.userCreated && (
        <>
          <p>
            Provably Fair allows you to verify that the result of each game was
            randomly generated. Since you are playing from this wallet for the
            first time, you can request the initial hashed seed ahead of time.
            After this it will be done automatically for each play.
          </p>
          <GambaPlayButton onClick={initialize} text="Get hashed seed" />
        </>
      )}
      {gamba.userCreated && (
        <>
          <p>
            Your client seed will affect the result of the next game you play.
          </p>
          <div
            style={{
              display: "grid",
              gap: "10px",
              width: "100%",
              padding: "20px",
            }}
          >
            <div>Next RNG Seed (sha256)</div>
            <GambaUi.TextInput value={gamba.nextRngSeedHashed || ""} disabled />
            <div>Client Seed</div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <GambaUi.TextInput
                style={{ flexGrow: "1" }}
                value={platform.clientSeed}
                disabled={gamba.isPlaying}
                maxLength={32}
                onChange={platform.setClientSeed}
              />
              <GambaUi.Button
                disabled={gamba.isPlaying}
                onClick={() =>
                  platform.setClientSeed(String((Math.random() * 1e9) | 0))
                }
              >
                <FaShuffle className="w-6 h-6" />
              </GambaUi.Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
