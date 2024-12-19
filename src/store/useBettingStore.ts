import { create } from "zustand";

interface BettingStore {
  balance: number;
  bets: { [key: string]: number };
  spinResult: number | null;
  isSpinning: boolean;
  placeBet: (type: string, value: string | number, amount: number) => void;
  clearBets: () => void;
  updateBalance: (amount: number) => void;
  setSpinResult: (result: number) => void;
  setIsSpinning: (spinning: boolean) => void;
}

export const useBettingStore = create<BettingStore>((set, get) => ({
  balance: 1000,
  bets: {},
  spinResult: null,
  isSpinning: false,
  placeBet: (type, value, amount) => {
    const { balance, bets } = get();
    const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
    if (balance - totalBet - amount >= 0) {
      set({
        bets: {
          ...bets,
          [`${type}-${value}`]: (bets[`${type}-${value}`] || 0) + amount,
        },
      });
    } else {
      alert("Insufficient balance to place this bet.");
    }
  },
  clearBets: () => set({ bets: {} }),
  updateBalance: (amount) =>
    set((state) => ({ balance: state.balance + amount })),
  setSpinResult: (result) => set({ spinResult: result }),
  setIsSpinning: (spinning) => set({ isSpinning: spinning }),
}));
