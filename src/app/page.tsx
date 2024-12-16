export default function Home() {
  const games = [
    { name: "Dice", icon: "🎲" },
    { name: "Crash", icon: "💥" },
    { name: "Roulette", icon: "🎡" },
    { name: "Coinflip", icon: "🪙" },
    { name: "Mines", icon: "💣" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Choose a Game</h1>
      <div className="grid grid-cols-2 gap-4">
        {games.map((game) => (
          <button
            key={game.name}
            className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            <span className="text-4xl mb-2">{game.icon}</span>
            <span className="text-sm">{game.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
