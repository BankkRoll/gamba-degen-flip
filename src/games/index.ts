import { GameBundle } from "gamba-react-ui-v2";
import dynamic from "next/dynamic";

interface GameMeta {
  background?: string;
  name: string;
  image?: string;
}

export const GAME: GameBundle<GameMeta> = {
  id: "flip",
  meta: {
    background: "#FFEB3B",
    name: "Flip",
    image: "/games/logo.png",
  },
  app: dynamic(() => import("./Flip")),
};