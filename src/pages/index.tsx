import CustomRenderer, { CustomError } from "@/components/game/GameRenderer";

import { GAME } from "@/games";
import { GambaUi } from "gamba-react-ui-v2";
import RecentPlays from "@/components/game/RecentPlays/RecentPlays";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-6xl pt-20 mx-auto">
        <GambaUi.Game game={GAME} errorFallback={<CustomError />}>
          <CustomRenderer />
        </GambaUi.Game>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto mb-4 max-w-7xl">
        <div className="py-4">
          <RecentPlays />
        </div>
      </div>
    </>
  );
}
