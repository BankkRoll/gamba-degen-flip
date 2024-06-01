import { BPS_PER_WHOLE, GambaTransaction } from "gamba-core-v2";
import { TokenValue, useTokenMeta } from "gamba-react-ui-v2";

export const extractMetadata = (event: GambaTransaction<"GameSettled">) => {
  const [version, gameId, ...rest] = event.data.metadata.split(":");
  const isFlipGame = gameId.toLowerCase() === "flip";

  return {
    game: "flip",
    isFlipGame,
  };
};

const winSayings = [
  "bagged some gains",
  "hit the jackpot",
  "made it rain",
  "moonshot",
  "scored big time",
  "riding the green candle",
];

const lossSayings = [
  "got rugged",
  "rekt",
  "hit rock bottom",
  "flopped hard",
  "wiped out",
  "dropped to zero",
];

const getRandomSaying = (sayings: string[]) => sayings[Math.floor(Math.random() * sayings.length)];

export function RecentPlay({
  event,
}: {
  event: GambaTransaction<"GameSettled">;
}) {
  const data = event.data;
  const token = useTokenMeta(data.tokenMint);

  const multiplier = data.bet[data.resultIndex.toNumber()] / BPS_PER_WHOLE;
  const wager = data.wager.toNumber();
  const payout = multiplier * wager;
  const profit = payout - wager;

  const { game, isFlipGame } = extractMetadata(event);

  if (!isFlipGame) {
    return null; // Skip non-flip transactions
  }

  const saying = profit >= 0 ? getRandomSaying(winSayings) : getRandomSaying(lossSayings);

  return (
    <div className="flex items-center justify-between w-full gap-4 md:gap-6">
      <div className="flex items-center justify-center gap-2">
        <img
          src={`/games/${game}/logo.png`}
          alt={`${game}`}
          className="items-center justify-center"
          width="60px"
        />
      </div>
      <div
        className="flex items-center justify-center gap-2"
        style={{ color: "#a079ff" }}
      >
        {`${data.user.toBase58().substring(0, 4)}...${data.user
          .toBase58()
          .slice(-4)}`}
      </div>
      <div className="flex items-center justify-center gap-2">
        {profit >= 0 ? "WON" : "LOST"}: {saying}
      </div>
      <div
        className="flex items-center justify-center gap-2 p-1 rounded-lg"
        style={{ backgroundColor: profit > 0 ? "#34D399" : "#666" }}
      >
        {token.image ? (
          <img
            src={token.image}
            alt="Token"
            width={24}
            className="flex-shrink-0 rounded-full"
          />
        ) : (
          <span className="flex items-center justify-center inline-block w-6 h-6 text-xs font-medium text-white border border-white rounded-full">
            {token.symbol}
          </span>
        )}
        <TokenValue amount={Math.abs(profit)} mint={data.tokenMint} />
      </div>
      <div className="flex-col items-center justify-center hidden md:flex">
        {profit > 0 && <div>({multiplier.toFixed(2)}x)</div>}
        {data.jackpotPayoutToUser.toNumber() > 0 && (
          <div className="flex items-center gap-2 p-1 text-black rounded-lg animate-jackpotGradient">
            +
            <TokenValue
              mint={data.tokenMint}
              amount={data.jackpotPayoutToUser.toNumber()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
