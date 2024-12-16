import { getNumberColor } from "../getNumberColor";

type Bets = {
  [key: string]: number;
};

const BET_PAYOUTS = {
  number: 35,
  color: 1,
  evenodd: 2,
  highlow: 1,
  dozen: 2,
};

export const calculatePayout = (result: number, bets: Bets) => {
  let payout = 0;

  Object.keys(bets).forEach((betKey) => {
    const [betType, betValue] = betKey.split("-");
    let won = false;

    switch (betType) {
      case "number":
        if (parseInt(betValue) === result) {
          payout += bets[betKey] * BET_PAYOUTS[betType];
          won = true;
        }
        break;
      case "color":
        if (betValue === getNumberColor(result)) {
          payout += bets[betKey] * BET_PAYOUTS[betType];
          won = true;
        }
        break;
      case "evenodd":
        if (
          (result % 2 === 0 && betValue === "even") ||
          (result % 2 !== 0 && betValue === "odd")
        ) {
          payout += bets[betKey] * BET_PAYOUTS[betType];
          won = true;
        }
        break;
      case "highlow":
        if (
          (result >= 1 && result <= 18 && betValue === "1-18") ||
          (result >= 19 && result <= 36 && betValue === "19-36")
        ) {
          payout += bets[betKey] * BET_PAYOUTS[betType];
          won = true;
        }
        break;
      case "dozen":
        if (
          (result >= 1 && result <= 12 && betValue === "1-12") ||
          (result >= 13 && result <= 24 && betValue === "13-24") ||
          (result >= 25 && result <= 36 && betValue === "25-36")
        ) {
          payout += bets[betKey] * BET_PAYOUTS[betType];
          won = true;
        }
        break;
      default:
        break;
    }

    if (won) {
      delete bets[betKey]; // Remove winning bets
    }
  });

  return payout;
};
