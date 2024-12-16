import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

interface PrizeData {
  option: string;
  style: { backgroundColor: string; color: string };
}

const prizeColors: string[] = [
  "#ffc202", // Yellow (Gold)
  "#31ff39", // Green
  "#13c4fc", // Blue
  "#FFFFFF", // White
  "#3e3e3b", // Black
];

const shuffleArray = (array: string[]) => {
  const shuffleArray = [...array];
  for (let i = shuffleArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
  }
  return shuffleArray;
};

const createRandomizedWheelColors = (totalSegments: number): string[] => {
  const colorCounts = {
    [prizeColors[0]]: Math.floor(totalSegments * 0.21), // Yellow: ~21%
    [prizeColors[1]]: Math.floor(totalSegments * 0.21), // Green: ~21%
    [prizeColors[2]]: 1, // Blue: 1 segment
    [prizeColors[3]]: 1, // White: 1 segment
    [prizeColors[4]]: Math.floor(totalSegments * 0.56),
  };

  const colorArray: string[] = [];

  Object.entries(colorCounts).forEach(([color, count]) => {
    for (let i = 0; i < count; i++) {
      colorArray.push(color);
    }
  });

  while (colorArray.length < totalSegments) {
    colorArray.push(prizeColors[4]); // Rest are black
  }

  while (colorArray.length > totalSegments) {
    colorArray.pop();
  }

  return shuffleArray(colorArray);
};

const totalSegments = 28;
const randomizedWheelColors = createRandomizedWheelColors(totalSegments);
const wheelData: PrizeData[] = randomizedWheelColors.map((color) => ({
  option: "",
  style: {
    backgroundColor: color,
    color: color === prizeColors[4] ? "white" : "black",
  },
}));

const WheelOfPrizes: React.FC = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="flex flex-col items-center justify-center  absolute z-20 bg-black text-white">
      {/* Wheel */}
      <div className="relative">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={wheelData}
          outerBorderColor="transparent"
          outerBorderWidth={0}
          innerBorderWidth={200}
          radiusLineColor="black"
          radiusLineWidth={2}
          pointerProps={{
            src: "/heart.svg",
            style: {
              rotate: "50deg",
            },
          }}
          textDistance={70}
          onStopSpinning={() => setMustSpin(false)}
        />

        {/* <div className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-yellow-500 relative bottom-10text-4xl">💛</div>
        </div> */}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-white">4.00x</div>
        </div>
      </div>

      <button
        onClick={handleSpinClick}
        className="mt-8 px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition"
      >
        Spin
      </button>
    </div>
  );
};

export default WheelOfPrizes;
