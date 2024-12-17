import { cn } from "@/utils/cn";

const BettingButton: React.FC<{ onClick?: () => void; className?: string }> = ({
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `w-full mt-4 h-[70px] bg-gradient-to-br from-[#ffa101] to-[#ffbc02] rounded-[16px] shadow-sm shadow-orange-500 border-yellow-600  border font-semibold text-[16px] `,
        className,
      )}
    >
      BET
    </button>
  );
};

export default BettingButton;
