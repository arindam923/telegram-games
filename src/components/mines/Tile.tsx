import Image from "next/image";
import { memo } from "react";

import { CellState } from "@/store/MineStore";

export const Tile = memo(
  ({
    item,
    onClick,
    disabled,
  }: {
    item: CellState;
    onClick: () => void;
    disabled: boolean;
  }) => {
    const getBackground = () => {
      switch (item) {
        case "revealed-mine":
          return "bg-gradient-to-br from-[#f13838] to-[#b41717]";
        case "revealed-diamond":
          return "bg-[#ffa101] ";
        default:
          return "bg-gradient-to-br from-[#333332] to-[#403e3e]";
      }
    };

    const getImage = () => {
      switch (item) {
        case "revealed-mine":
          return "/bomb.svg";
        case "revealed-diamond":
          return "/diamond.svg";
        default:
          return "/question.svg";
      }
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`size-16 rounded-md flex items-center justify-center ${getBackground()}
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}`}
      >
        <Image src={getImage()} alt={`tile-${item}`} width={24} height={24} />
      </button>
    );
  },
);
Tile.displayName = "Tile";
