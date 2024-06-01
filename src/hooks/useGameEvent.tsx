import { BPS_PER_WHOLE, GambaTransaction } from "gamba-core-v2";
import { TokenValue, useTokenMeta } from "gamba-react-ui-v2";

import Link from "next/link";
import { extractMetadata } from "@/utils/RecentPlay";
import { toast } from "sonner";
import { useGambaEventListener } from "gamba-react-v2";
import { useWallet } from "@solana/wallet-adapter-react";

function RecentPlay({ event }: { event: GambaTransaction<"GameSettled"> }) {
  const data = event.data;
  const token = useTokenMeta(data.tokenMint);

  const multiplier = data.bet[data.resultIndex.toNumber()] / BPS_PER_WHOLE;
  const wager = data.wager.toNumber();
  const payout = multiplier * wager;
  const profit = payout + data.jackpotPayoutToUser.toNumber() - wager;

  const { game, isFlipGame } = extractMetadata(event);

  if (!isFlipGame || !token) {
    return null; // Skip non-flip transactions
  }

  const textColorClass = profit >= 0 ? "text-green-600" : "text-red-600";

  return (
    <>
      <img src={`/games/${game}/logo.png`} alt={"Splash"} className="h-10" />
      <div className={textColorClass}>
        <img
          src="/logo.svg"
          alt="gamba"
          className="absolute w-24 h-6 rounded-full top-2 right-2"
        />
        <div className="text-lg font-bold">
          {data.user.toBase58().substring(0, 4)}...{" "}
          <span className="text-sm">{profit >= 0 ? "WON" : "LOST"}</span>{" "}
          <TokenValue amount={Math.abs(profit)} mint={data.tokenMint} />
        </div>
        <div className="flex items-center gap-2 mt-2 whitespace-nowrap">
          {token.image ? (
            <img
              src={token.image}
              alt={`${token.name}`}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <span className="items-center justify-center inline-block w-6 h-6 text-xs font-medium text-white border border-white rounded-full">
              <span className="flex items-center justify-center w-4 h-4 border border-white rounded-full">
                {token.symbol}
              </span>
            </span>
          )}
          {profit >= 0 && (
            <>
              <span className={`text-sm font-semibold text-green-600`}>
                +
                <TokenValue
                  amount={data.payout.toNumber()}
                  mint={data.tokenMint}
                />
              </span>
              <span className="text-xs font-medium text-gray-500">
                ({multiplier.toFixed(2)}x)
              </span>
            </>
          )}
        </div>
        {data.jackpotPayoutToUser.toNumber() > 0 && (
          <div className="flex items-center gap-2 p-1 mt-2 text-black rounded-lg animate-jackpotGradient">
            +
            <TokenValue
              mint={data.tokenMint}
              amount={data.jackpotPayoutToUser.toNumber()}
            />
          </div>
        )}
        <div className="absolute flex flex-row gap-2 bottom-2 right-2">
          <a
            href={`https://explorer.gamba.so/tx/${event.signature}`}
            target="_blank"
            rel="noreferrer"
          >
            <button className="p-1 text-xs rounded-lg">
              Verify
            </button>
          </a>
          <Link href={`/play/${game}`} passHref>
            <button className="p-1 text-xs rounded-lg ">
              Play
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

const GameToast = () => {
  const { publicKey } = useWallet();

  useGambaEventListener("GameSettled", (event) => {
    const { game, isFlipGame } = extractMetadata(event);
    if (isFlipGame) {
      const connectedUserPublicKeyString = publicKey?.toString();
      const eventUserPublicKeyString = event.data.user.toBase58();

      if (
        !publicKey ||
        eventUserPublicKeyString !== connectedUserPublicKeyString
      ) {
        const isGameWon = event.data.payout.toNumber() > 0;
        const toastType = isGameWon ? toast.success : toast.error;

        toastType(<RecentPlay event={event} />, {
          duration: 5000,
          position: "bottom-right",
        });
      }
    }
  });

  return null;
};

export default GameToast;
