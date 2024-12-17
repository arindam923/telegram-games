import Header from "@/components/common/Header";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default GameLayout;
