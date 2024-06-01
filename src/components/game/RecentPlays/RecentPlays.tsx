import { GambaTransaction } from "gamba-core-v2";
import { GambaUi } from "gamba-react-ui-v2";
import { RecentPlay } from "@/utils/RecentPlay";
import { ShareModal } from "./ShareModal";
import { TimeDiff } from "@/utils/TimeDiff";
import { useRecentPlays } from "../../../hooks/useRecentPlays";
import { useState } from "react";

export default function RecentPlays() {
  const events = useRecentPlays(false);
  const [selectedGame, setSelectedGame] =
    useState<GambaTransaction<"GameSettled"> | null>(null);

  return (
    <div className="min-w-[90svw] md:min-w-[85svw] lg:min-w-[75svw] 2xl:min-w-[60svw] w-full relative flex flex-col gap-2.5">
      {selectedGame && (
        <ShareModal
          event={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
      {events.length > 0 ? (
        events.map((tx, index) => (
          <button
            key={tx.signature + "-" + index}
            onClick={() => setSelectedGame(tx)}
            className="flex items-center gap-2 p-2.5 rounded-lg game-foreground justify-between"
          >
            <div className="flex items-center gap-2">
              <RecentPlay event={tx} />
            </div>
            <TimeDiff time={tx.time} />
          </button>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-10 bg-gray-300 rounded-lg">
          No events found
        </div>
      )}
      <GambaUi.Button
        main
        onClick={() => window.open("https://explorer.gamba.so/")}
      >
        🚀 Explorer
      </GambaUi.Button>
    </div>
  );
}
