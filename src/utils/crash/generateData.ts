import { DataType } from "@/components/crash/Graph";

export const generateData = () => {
  const newData: DataType[] = [];
  let currentValue = 1.0;
  const timeStep = 0.1;
  const maxMultiplier = parseFloat((Math.random() * (50 - 2) + 2).toFixed(3));
  let time = 0;

  while (currentValue < maxMultiplier) {
    if (time <= 0.1) {
      currentValue = 1.0;
    } else {
      const t = time - 0.1;
      currentValue = 1.0 + 0.5 * t + 0.05 * t * t;
    }
    currentValue = Math.min(currentValue, maxMultiplier);
    newData.push({
      time: parseFloat((time + 2).toFixed(2)),
      value: parseFloat(currentValue.toFixed(3)),
    });
    time += timeStep;
  }

  // Add a final "crash" point to stop the animation
  newData.push({
    time: parseFloat((time + 2).toFixed(2)),
    value: parseFloat(maxMultiplier.toFixed(3)),
  });

  return newData;
};
