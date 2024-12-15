const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full mt-4 h-2 bg-[#403e3e]">
      <div
        className="h-full "
        style={{
          width: `${percentage}%`,
          background: `linear-gradient(90deg, rgba(255, 174, 2, 0) 0%, #FFAE02 52.5%, #FFAE02 100%)`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
