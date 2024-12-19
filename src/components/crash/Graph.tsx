"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface DataType {
  time: number;
  value: number;
}

const AnimatedAreaGraph: React.FC<{
  generateData: () => DataType[];
  triggerAnimation: boolean;
  cashOutMultiplier: number | null;
  onMultiplierChange: (multiplier: number, isFinal: boolean) => void;
}> = ({
  generateData,
  triggerAnimation,
  cashOutMultiplier,
  onMultiplierChange,
}) => {
  const [_data, setData] = useState<DataType[]>([]);
  const [_maxValue, setMaxValue] = useState<number>(1);
  const [animatedData, setAnimatedData] = useState<DataType[]>([]);
  const [currentYAxisMax, setCurrentYAxisMax] = useState<number>(1);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!triggerAnimation) return;

    const initialData = generateData();
    setData(initialData);
    let currentIndex = 0;

    const animate = () => {
      if (cashOutMultiplier !== null) {
        // Stop animation at cash out multiplier
        const cashOutIndex = initialData.findIndex(
          (point) => point.value >= cashOutMultiplier
        );
        if (cashOutIndex >= 0) {
          setAnimatedData(initialData.slice(0, cashOutIndex + 1));
          onMultiplierChange(cashOutMultiplier, true);
          return;
        }
      }

      if (currentIndex < initialData.length) {
        const currentSlice = initialData.slice(0, currentIndex + 1);
        setAnimatedData(currentSlice);
        const currentMultiplier = initialData[currentIndex].value;
        onMultiplierChange(
          currentMultiplier,
          currentIndex === initialData.length - 1
        );
        currentIndex++;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [triggerAnimation, cashOutMultiplier]);

  return (
    <div className="relative w-full h-96 bg-black">
      <div
        className="absolute top-0 left-0 w-full h-96 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/crash-bg.svg')`,
        }}
      />
      <div className="absolute top-0 w-full h-96 flex justify-center items-center z-10">
        {isAnimationComplete && animatedData.length > 0 && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
            <span className="text-6xl font-bold text-red-500">
              {animatedData[animatedData.length - 1].value.toFixed(2)}x
            </span>
          </div>
        )}
        <ResponsiveContainer width="95%" height={300}>
          <AreaChart data={animatedData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isAnimationComplete ? "#304553" : "#ffc202"}
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor={isAnimationComplete ? "#304553" : "#fea602"}
                  stopOpacity={0.8}
                />
              </linearGradient>
            </defs>
            <YAxis
              dataKey="value"
              domain={[1, currentYAxisMax]}
              tickFormatter={(tick) => `${tick.toFixed(1)}x`}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#7d7d7d",
                fontSize: 10,
                fontWeight: 600,
              }}
              width={30}
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickFormatter={(tick) => `${tick}s`}
              tick={{
                fill: "#7d7d7d",
                fontSize: 10,
                fontWeight: 600,
              }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isAnimationComplete ? "#eee" : "#fff"}
              strokeWidth={5}
              fillOpacity={1}
              fill="url(#colorUv)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnimatedAreaGraph;
