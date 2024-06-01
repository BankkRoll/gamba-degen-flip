// src/games/Flip/index.tsx
import { BannerWithMessages, FlipBanner } from "./FlipBanner";
import { Coin, TEXTURE_HEADS, TEXTURE_TAILS } from "./Coin";
import { GambaUi, useCurrentToken, useSound } from "gamba-react-ui-v2";
import React, { FC, Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Effect } from "./Effect";
import GambaPlayButton from "@/components/ui/GambaPlayButton";
import { Text } from "@react-three/drei";
import { toast } from "sonner";
import { useGamba } from "gamba-react-v2";

const SIDES = {
  heads: [2, 0],
  tails: [0, 2],
};

const SOUND_COIN = "/games/flip/coin.mp3";
const SOUND_WIN = "/games/flip/win.mp3";
const SOUND_LOSE = "/games/flip/lose.mp3";

type Side = keyof typeof SIDES;

function Flip() {
  const game = GambaUi.useGame();
  const token = useCurrentToken();
  const gamba = useGamba();
  const [flipping, setFlipping] = useState(false);
  const [win, setWin] = useState<boolean | undefined>(undefined);
  const [resultIndex, setResultIndex] = useState(0);
  const [result, setResult] = useState([]);
  const [side, setSide] = useState<Side>("heads");

  const WAGER_OPTIONS = [1, 5, 10, 50, 100];
  const [wager, setWager] = useState(WAGER_OPTIONS[0]);

  const sounds = useSound({
    coin: SOUND_COIN,
    win: SOUND_WIN,
    lose: SOUND_LOSE,
  });

  let messages = ["Flip to win!"];
  if (flipping) {
    messages = ["Flipping!", "Good luck!"];
  } else if (win === true) {
    messages = ["You win!", "Congrats!"];
  } else if (win === false) {
    messages = ["You lose!"];
  }

  const play = async () => {
    try {
      setWin(undefined);
      setFlipping(true);
      setResult([]);
      sounds.play("coin", { playbackRate: 0.5 });

      await game.play({
        bet: SIDES[side],
        wager,
        metadata: [side],
      });

      sounds.play("coin");
      const result = await gamba.result();
      const win = result.payout > 0;
      setResultIndex(result.resultIndex);
      setResult(result as any);
      setWin(win ? true : false);

      if (win) {
        sounds.play("win");
      } else {
        sounds.play("lose");
      }
    } catch (err: any) {
      messages = ["Flip to win!"];

      toast.error(`An error occurred: ${err.message}`);
    } finally {
      setFlipping(false);
    }
  };

  return (
    <>
      <GambaUi.Portal target="screen">
          <Canvas
            linear
            flat
            orthographic
            camera={{
              zoom: 80,
              position: [0, 0, 100],
            }}
          >
            <Suspense fallback={null}>
              <ambientLight />
              <BannerWithMessages messages={messages} />

              <Coin
                key={"main-coin"}
                result={resultIndex}
                flipping={flipping}
                scale={1}
                rotation={[-0.6, 0, 0]}
              />
            </Suspense>
            <Effect color="white" />

            {flipping && <Effect color="white" />}
            {win && <Effect color="#42ff78" />}
            <ambientLight intensity={3} />
            <directionalLight
              position-z={1}
              position-y={1}
              castShadow
              color="#CCCCCC"
            />
            <hemisphereLight
              intensity={0.5}
              position={[0, 1, 0]}
              scale={[1, 1, 1]}
              color="#ffadad"
              groundColor="#6666fe"
            />
          </Canvas>
      </GambaUi.Portal>

      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaUi.Button
          disabled={gamba.isPlaying}
          onClick={() => setSide(side === "heads" ? "tails" : "heads")}
        >
          <div style={{ display: "flex" }}>
            <img
              className="w-6 h-6"
              src={side === "heads" ? TEXTURE_HEADS : TEXTURE_TAILS}
            />
            {side === "heads" ? "Heads" : "Tails"}
          </div>
        </GambaUi.Button>
        <GambaPlayButton onClick={play} text="Flip" />
      </GambaUi.Portal>
    </>
  );
}

export default Flip;
