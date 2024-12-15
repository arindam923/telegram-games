export const getNumberColor = (number: number) => {
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  const blackNumbers = [
    2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
  ];

  if (number === 0) return "bg-green-600";
  if (redNumbers.includes(number)) return "bg-red-600";
  if (blackNumbers.includes(number)) return "bg-black";
  return "bg-gray-400";
};
