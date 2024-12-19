import React from "react";

export type ColorType = "gray" | "white" | "green" | "yellow" | "blue";

interface MultiplierButtonProps {
  multiplier: number;
  color: ColorType;
  className?: string;
}

const MultiplierButton = ({
  multiplier,
  color,
  className,
}: MultiplierButtonProps) => {
  const getColorClass = () => {
    switch (color) {
      case "white":
        return "bg-gray-100";
      case "green":
        return "bg-green-600";
      case "yellow":
        return "bg-yellow-500";
      case "blue":
        return "bg-blue-500";
      case "gray":
        return "bg-gray-500";
      default:
        return "bg-gray-500"; // Default if color doesn't match
    }
  };

  const getLowerColorClass = () => {
    switch (color) {
      case "white":
        return "bg-gray-500";
      case "green":
        return "bg-green-400";
      case "yellow":
        return "bg-yellow-400";
      case "blue":
        return "bg-blue-400";
      case "gray":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-md ${className}`}
    >
      <div
        className={`py-1 flex justify-center items-center ${
          color === "white" ? "text-black" : "text-white"
        } font-bold text-lg ${getColorClass()}`}
      >
        {multiplier}X
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-1/3 ${getLowerColorClass()}`}
      />
    </div>
  );
};

export default MultiplierButton;
