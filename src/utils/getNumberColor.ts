export const getNumberColor = (number: number) => {
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  const blackNumbers = [
    2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
  ];

  if (number === 0)
    return "bg-gradient-to-b from-[rgba(7,227,15,0.05)] border-t border-l border-[#07E30F] to-[rgba(47,91,41,0.44)] rounded-[11px] text-white";
  if (redNumbers.includes(number))
    return "bg-gradient-to-b from-[rgba(227,7,7,0.05)] border-t border-l border-[#E30707] to-[rgba(91,43,41,0.44)] rounded-[11px] text-white";
  if (blackNumbers.includes(number))
    return "bg-gradient-to-b from-[#242422] via-[#242422] to-[#161613] border-t border-l border-[#666] rounded-[11px] text-white";
  return "bg-gray-400 rounded-[11px] text-white";
};
