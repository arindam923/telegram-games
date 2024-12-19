const MultiplierButton: React.FC<{
  label: string;
  onClick: () => void;
}> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={` grid bg-[#100f11] border-2 border-[#2E2E2D] place-items-center h-[55px] w-[55px] rounded-xl disabled:opacity-50`}
    >
      {label}
    </button>
  );
};

export default MultiplierButton;
