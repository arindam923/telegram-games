import Image from "next/image";

const Dice = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="mt-4 border border-[#242424] rounded-2xl flex justify-center flex-col items-center relative w-[90%] mx-auto h-[300px]">
        <Image
          src="/dice-bg.png"
          alt="Description"
          fill
          className="w-full h-full object-cover"
        />
        <div className="relative z-10 w-full h-[80px] ">
          <Image src="/Union.svg" alt="" fill />
          <input
            type="range"
            className="range w-[75%] absolute left-12 top-5 z-10 bg-transparent"
          />
        </div>
        <div className="w-[95%]  grid-cols-3  rounded-lg gap-2 z-10 mt-4 text-white bg-gradient-to-br from-[#242422] to-[#161613] border border-[#1f1f1d] mx-auto p-4 grid">
          <div className="space-y-2">
            <p className="text-[14px] font-medium">Multiplier</p>
            <div className=" text-[18px] font-medium text-[#b1b0b0] border border-[#2e2e2d] h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] rounded-[11px] flex items-center justify-center">
              2.0000
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[14px] font-medium">Roll over</p>
            <div className="text-[18px] font-medium text-[#b1b0b0] border border-[#2e2e2d] h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] rounded-[11px] flex items-center justify-center">
              2.0000
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[14px] font-medium">Win Chance </p>
            <div className=" text-[18px] font-medium text-[#b1b0b0] border border-[#2e2e2d] h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] rounded-[11px] flex items-center justify-center">
              2.0000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dice;
