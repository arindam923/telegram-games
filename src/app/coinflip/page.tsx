"use client";

import BettForm from "@/components/BettForm";
import Image from "next/image";

const CoinFlip = () => {
  const handleImageClick = (index: number) => {};

  return (
    <div className="min-h-screen w-full">
      <div className="w-[90%] mt-5 mx-auto h-[300px] rounded-[21px] bg-gradient-to-br from-[#242424]/80 to-[#161613]/80 border border-[#1f1f1d] flex items-center justify-center">
        <div className="flex items-center space-x-10">
          <div className="flex flex-col items-center transition-all duration-300 ease-in-out">
            <Image
              src="/yellow-coin.svg"
              width={60}
              height={60}
              alt="Coin Side 1"
              className="cursor-pointer"
              onClick={() => handleImageClick(0)}
            />
            <div
              style={{
                background:
                  "linear-gradient(180.59deg, rgba(7, 227, 15, 0.05) 0.5%, rgba(47, 91, 41, 0.44) 99.49%)",
              }}
              className="w-[74px] border-t-2 border-b border-l-2 border-[#07e30f] text-[10px] grid place-items-center mt-2 h-[26px] rounded-[11px]"
            >
              Random
            </div>
          </div>
          <div className="flex flex-col items-center transition-all duration-300 ease-in-out">
            <Image
              src="/gren-coin.svg"
              width={100}
              height={100}
              alt="Coin Main"
              className="cursor-pointer"
              onClick={() => handleImageClick(1)}
            />
            <div
              style={{
                background:
                  "linear-gradient(180.59deg, rgba(7, 227, 15, 0.05) 0.5%, rgba(47, 91, 41, 0.44) 99.49%)",
              }}
              className="w-[74px] border-t-2 border-b border-l-2 border-[#07e30f] text-[10px] grid place-items-center mt-2 h-[26px] rounded-[11px]"
            >
              Heads
            </div>
          </div>
          <div className="flex flex-col items-center transition-all duration-300 ease-in-out">
            <Image
              src="/red-coin.svg"
              width={60}
              height={60}
              alt="Coin Side 2"
              className="cursor-pointer"
              onClick={() => handleImageClick(2)}
            />
            <div
              style={{
                background:
                  "linear-gradient(180.59deg, rgba(7, 227, 15, 0.05) 0.5%, rgba(47, 91, 41, 0.44) 99.49%)",
              }}
              className="w-[74px] border-t-2 border-b border-l-2 border-[#07e30f] text-[10px] grid place-items-center mt-2 h-[26px] rounded-[11px]"
            >
              Tails
            </div>
          </div>
        </div>
      </div>
      <BettForm />
    </div>
  );
};

export default CoinFlip;
