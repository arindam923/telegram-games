import Header from "@/components/Header";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default GameLayout;
