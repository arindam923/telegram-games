import { Ellipsis } from "lucide-react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

const Header = () => {
  return (
    <div className="w-full">
      <div className="flex p-4 w-full items-center justify-between ">
        <button className="">Cancel</button>
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-center">
          BOT
        </h2>
        <button className="rounded-full border-[1.6px] p-[2px]  border-[#ffc67d]">
          <Ellipsis className="h-6 w-6 text-white" />
        </button>
      </div>
      <div className="flex px-2 w-full items-center justify-between">
        <div className="relative w-[30%] h-[60px]">
          <Image src="/Subtract.svg" alt="" fill />
          <div className="absolute   gap-1 flex items-center text-sm top-2 right-8">
            <Image src="/logo.svg" width={30} height={30} alt="" />
            <div className="flex flex-col items-center">
              <h2 className="text-[13px]">+130</h2>
              <p className="text-[12px] text-[#cec7c7]">hour</p>
            </div>
          </div>
        </div>
        <div className="w-[40%]" />
        <div className="relative w-[30%] h-[60px] ml-auto">
          <Image src="/Subtract-2.svg" alt="" fill />
          <div className="absolute text-sm top-0 right-4 text-right">
            <Image src="/bell.svg" width={50} height={50} alt="" />
          </div>
        </div>
      </div>
      <ProgressBar percentage={80} />
    </div>
  );
};

export default Header;
