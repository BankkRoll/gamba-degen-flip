// components/ui/TokenSelect.tsx
import {
  GambaPlatformContext,
  GambaUi,
  TokenValue,
  useCurrentPool,
  useCurrentToken,
  useTokenBalance,
} from "gamba-react-ui-v2";
import { useContext, useState } from "react";

import GambaPlayButton from "./GambaPlayButton";
import { Modal } from "./Modal";
import { TOKENLIST } from "../../constants";
import { toast } from "sonner";
import { useUserStore } from "@/hooks/useUserStore";

export default function TokenSelect() {
  const context = useContext(GambaPlatformContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [bonusHelp, setBonusHelp] = useState(false);
  const [jackpotHelp, setJackpotHelp] = useState(false);
  const selectedToken = useCurrentToken();
  const token = useCurrentToken();
  const pool = useCurrentPool();
  const balance = useTokenBalance();
  const tokensArray = Object.values(TOKENLIST);

  const { isPriorityFeeEnabled, priorityFee, set } = useUserStore((state) => ({
    isPriorityFeeEnabled: state.isPriorityFeeEnabled,
    priorityFee: state.priorityFee,
    set: state.set,
  }));
  const [newPriorityFee, setNewPriorityFee] = useState(priorityFee);

  const handleSetPriorityFee = () => {
    try {
      set({ priorityFee: newPriorityFee });
      toast.success(`Priority fee set to ${newPriorityFee}`);
    } catch (error) {
      toast.error("Error setting priority fee");
      console.error("Error setting priority fee:", error);
    }
  };

  const setToken = (token: {
    mint: any;
    poolAuthority?: any;
    name: string;
    symbol?: string;
    image?: string;
    decimals?: number;
    baseWager?: number;
  }) => {
    try {
      if (token && token.poolAuthority) {
        context.setPool(token.mint, token.poolAuthority);
      } else {
        context.setPool(token.mint);
      }
      toast.success(`Token set to ${token.name}`);
      setModalVisible(false);
    } catch (error) {
      toast.error("Error setting token");
      console.error("Error setting token:", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <GambaUi.Button onClick={toggleModal}>
        {selectedToken && (
          <div className="min-w-32 max-sm:text-xs whitespace-nowrap flex items-center gap-2.5">
            <img
              className="w-5 h-5 rounded-full"
              src={selectedToken.image}
              alt="Token"
            />
            <TokenValue amount={balance.balance} />
          </div>
        )}
      </GambaUi.Button>

      {modalVisible && (
        <Modal onClose={() => setModalVisible(false)}>
          {bonusHelp && (
            <Modal onClose={() => setBonusHelp(false)}>
              <h1 className="text-lg md:text-3xl">You have a bonus!</h1>
              <div className="mt-4 text-sm md:text-lg">
                You have{" "}
                <b className="all-unset cursor-pointer text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 text-xs uppercase font-bold">
                  <TokenValue amount={balance.bonusBalance} />
                </b>{" "}
                worth of free plays. This bonus will be applied automatically
                when you play.
              </div>
            </Modal>
          )}
          {jackpotHelp && (
            <Modal onClose={() => setJackpotHelp(false)}>
              <div className="text-lg font-semibold text-center">
                {token.name} Jackpot Details
              </div>
              {pool.jackpotBalance > 0 && (
                <div className="flex text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 uppercase font-bold">
                  <TokenValue amount={pool.jackpotBalance} />
                </div>
              )}
              <div className="mt-4 text-sm md:text-base">
                <p className="mt-4">
                  The Jackpot grows with each game played, funded by fees from
                  unsuccessful attempts to win it. Winning the jackpot not only
                  grants substantial rewards but also recycles a tiny portion of
                  the winnings back into the main liquidity pool, sustaining the
                  game&rsquo;s economy.
                </p>
                <div className="mt-4">
                  <div>
                    <strong>Pool Fee:</strong> {pool.poolFee}%
                  </div>
                  <div>
                    <strong>Liquidity:</strong>{" "}
                    <TokenValue amount={Number(pool.liquidity)} />
                  </div>
                  <div>
                    <strong>Minimum Wager:</strong>{" "}
                    <TokenValue amount={pool.minWager} />
                  </div>
                  <div>
                    <strong>Maximum Payout:</strong>{" "}
                    <TokenValue amount={pool.maxPayout} />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <GambaUi.Button main>
                    <a
                      href={`https://explorer.gamba.so/pool/${pool.publicKey.toString()}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Pool on Explorer
                    </a>
                  </GambaUi.Button>
                </div>
              </div>
            </Modal>
          )}
          {pool.jackpotBalance > 0 && (
            <button
              onClick={() => setJackpotHelp(true)}
              className="md:hidden flex all-unset cursor-pointer text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 text-xs uppercase font-bold transition-colors duration-200 hover:bg-white"
            >
              Jackpot - <TokenValue amount={pool.jackpotBalance} />
            </button>
          )}
          {balance.bonusBalance > 0 && (
            <button
              onClick={() => setBonusHelp(true)}
              className="md:hidden flex all-unset cursor-pointer text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 text-xs uppercase font-bold transition-colors duration-200 hover:bg-white"
            >
              +<TokenValue amount={balance.bonusBalance} />
            </button>
          )}
          <div className="min-w-64">
            <h2 className="text-lg font-bold md:text-2xl">Select Token</h2>
            <div className="flex flex-col min-w-full gap-2 p-2 overflow-y-auto modal max-h-48">
              {tokensArray.map((token, index) => (
                <button
                  key={index}
                  className="hover:outline hover:outline-1 flex items-center gap-2.5 px-2.5 py-2 rounded-lg w-full text-left"
                  onClick={() => setToken(token)}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={token.image}
                    alt={token.symbol}
                  />
                  {token.symbol}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <h2 className="text-lg font-bold md:text-2xl">Priority Fee</h2>
              <div className="flex justify-center">
                <GambaUi.Switch
                  checked={isPriorityFeeEnabled}
                  onChange={(checked: boolean) => {
                    set({ isPriorityFeeEnabled: checked });
                    if (checked) {
                      toast.success("Priority fee enabled");
                    } else {
                      toast.error("Priority fee disabled");
                    }
                  }}
                />
              </div>
            </div>
            {isPriorityFeeEnabled && (
              <div className="flex flex-col gap-2">
                <label>Priority Fee (Microlamports):</label>
                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <GambaUi.TextInput
                    style={{ flexGrow: "1" }}
                    type="number"
                    value={newPriorityFee}
                    onChange={(value: string) => {
                      const parsedValue = parseInt(value, 10);
                      if (!isNaN(parsedValue)) {
                        setNewPriorityFee(parsedValue);
                      }
                    }}
                  />
                  <GambaPlayButton text="Set" onClick={handleSetPriorityFee} />
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
