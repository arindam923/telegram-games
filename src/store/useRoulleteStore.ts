import { create } from "zustand";

interface RouletteStore {
  bets: { [key: string]: number };
  balance: number;
  spinResult: number | null;
  isManual: boolean;
  isBetPlaced: boolean;
  animationRunning: boolean;
  setBet: (betType: string, value: string | number, amount: number) => void;
  resetBets: () => void;
  setSpinResult: (result: number | null) => void;
  toggleAnimation: (state: boolean) => void;
  toggleIsManual: (state: boolean) => void;
}

export const useRouletteStore = create<RouletteStore>((set, get) => ({
  bets: {},
  balance: 1000, // Default balance
  spinResult: null,
  isManual: true,
  isBetPlaced: false,
  animationRunning: false,

  setBet: (betType, value, amount) => {
    const { bets, balance } = get();
    const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
    if (balance - totalBet - amount >= 0) {
      set((state) => ({
        bets: {
          ...state.bets,
          [`${betType}-${value}`]:
            (state.bets[`${betType}-${value}`] || 0) + amount,
        },
        isBetPlaced: true,
      }));
    } else {
      alert("Insufficient balance to place this bet.");
    }
  },

  resetBets: () => set({ bets: {}, isBetPlaced: false }),

  setSpinResult: (result) => set({ spinResult: result }),

  toggleAnimation: (state) => set({ animationRunning: state }),

  toggleIsManual: (state) => set({ isManual: state }),
}));
