const RouletteWheel: React.FC<{ isSpining: boolean }> = ({ isSpining }) => {
  return (
    <div className="bg-gradient-to-br mx-auto w-[95%] mt-5 rounded-[21px] from-[#242422] to-[#161613]">
      <div className="flex items-center justify-center relative">
        <div className="flex items-center justify-center my-10">
          <div className="relative size-[300px] rounded-full bg-black overflow-hidden">
            <div className="absolute inset-0 bg-zinc-700 rounded-full"></div>
            <div className="absolute inset-1/4 w-1/2 h-1/2 rounded-full bg-black"></div>
          </div>
        </div>
        <img
          src={"/Ellipse.png"}
          className={`size-[300px] absolute ${isSpining && "spin"}`}
          alt=""
        />
        <img
          src={"/Plus.png"}
          alt=""
          className={`size-[100px]  absolute ${isSpining && "spin"}`}
        />
      </div>
    </div>
  );
};

export default RouletteWheel;
