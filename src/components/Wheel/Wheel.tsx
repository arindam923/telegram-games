/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Wheel } from "react-custom-roulette";
import MultiplierButton, { ColorType } from "./MultiplierButton";

const grayColor = "#3e3e3b";
const greenColor = "#31ff39";
const yellowColor = "#FFC107";
const blueColor = "#13c4fc";
const whiteColor = "#fff";

const data = [
  { option: "", style: { backgroundColor: grayColor, multiplier: 0.0 } },
  {
    option: "",
    style: { backgroundColor: greenColor, multiplier: 1.5 },
  },
  {
    option: "",
    style: { backgroundColor: yellowColor, multiplier: 2.0 },
  },
  {
    option: "",
    style: { backgroundColor: greenColor, multiplier: 1.5 },
  },
  { option: "", style: { backgroundColor: grayColor, multiplier: 0.0 } },
  {
    option: "",
    style: { backgroundColor: yellowColor, multiplier: 2.0 },
  },
  {
    option: "",
    style: { backgroundColor: greenColor, multiplier: 1.5 },
  },
  { option: "", style: { backgroundColor: grayColor, multiplier: 0.0 } },
  {
    option: "",
    style: { backgroundColor: yellowColor, multiplier: 2.0 },
  },
  {
    option: "",
    style: { backgroundColor: greenColor, multiplier: 1.5 },
  },
  { option: "", style: { backgroundColor: grayColor, multiplier: 0.0 } },
  { option: "", style: { backgroundColor: blueColor, multiplier: 3.0 } },
  { option: "", style: { backgroundColor: grayColor, multiplier: 0.0 } },
  {
    option: "",
    style: { backgroundColor: greenColor, multiplier: 1.5 },
  },
  {
    option: "",
    style: { backgroundColor: yellowColor, multiplier: 2.0 },
  },
  {
    option: "",
    style: { backgroundColor: greenColor, multiplier: 1.5 },
  },
  { option: "", style: { backgroundColor: grayColor, multiplier: 0.0 } },
  {
    option: "",
    style: { backgroundColor: yellowColor, multiplier: 2.0 },
  },
  {
    option: "",
    style: { backgroundColor: greenColor, multiplier: 1.5 },
  },
  { option: "", style: { backgroundColor: grayColor, multiplier: 0.0 } },
  {
    option: "",
    style: { backgroundColor: yellowColor, multiplier: 2.0 },
  },
  { option: "", style: { backgroundColor: grayColor, multiplier: 0.0 } },
  {
    option: "",
    style: { backgroundColor: whiteColor, multiplier: 1.7 },
  },
  { option: "", style: { backgroundColor: grayColor, multiplier: 0.0 } },
  {
    option: "",
    style: { backgroundColor: greenColor, multiplier: 1.5 },
  },
  {
    option: "",
    style: { backgroundColor: yellowColor, multiplier: 2.0 },
  },
  {
    option: "",
    style: { backgroundColor: greenColor, multiplier: 1.5 },
  },
  {
    option: "",
    style: { backgroundColor: yellowColor, multiplier: 2.0 },
  },
];

type WheelProps = {
  mustSpin: boolean;
  prizeNumber: number;
  setMustSpin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  wheelRef?: React.RefObject<any>;
};

const PrizeWheel = forwardRef<any, WheelProps>(
  ({ mustSpin, setMustSpin, setIsSpinning, prizeNumber }, ref) => {
    const wheelRef = useRef(null);
    useImperativeHandle(ref, () => wheelRef.current);

    const [currentMultiplier, setCurrentMultiplier] = useState("0.0x");
    const [multiplierAnimation, setMultiplierAnimation] = useState(""); // Animation state

    const handleStopSpinning = (prize: number) => {
      const multiplier = String(data[prize].style.multiplier) + "x";
      setCurrentMultiplier(multiplier);
      setMultiplierAnimation("animate-in");
      setMustSpin(false);
      setIsSpinning(false);
    };

    const innerCircleStyle: React.CSSProperties = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000000",
      height: "40%",
      width: "40%",
      borderRadius: "50%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #0083FF",
    };

    useEffect(() => {
      if (multiplierAnimation === "animate-in") {
        const timeout = setTimeout(() => {
          setMultiplierAnimation("");
        }, 500);

        return () => clearTimeout(timeout);
      }
    }, [multiplierAnimation]);

    return (
      <div className="relative flex flex-col items-center justify-center w-96 h-96 ">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={[]} // use data.style
          textColors={[]} // no text for this case
          radiusLineWidth={0}
          outerBorderColor={"#666"}
          outerBorderWidth={0}
          innerRadius={25}
          innerBorderColor={"#000"}
          innerBorderWidth={140} // set to 0
          spinDuration={2}
          onStopSpinning={() => handleStopSpinning(prizeNumber)}
        />
        <div style={innerCircleStyle}>
          <span className="font-bold text-white text-3xl">
            {currentMultiplier}
          </span>
        </div>

        <div className="absolute gap-5 grid grid-cols-5   overflow-hidden -bottom-2 left-2 ">
          <MultiplierButton
            className={"w-12 h-10"}
            multiplier={0.0}
            color="gray"
          />
          <MultiplierButton
            className={"w-12 h-10"}
            multiplier={1.7}
            color="white"
          />
          <MultiplierButton
            className={"w-12 h-10"}
            multiplier={1.5}
            color="green"
          />
          <MultiplierButton
            className={"w-12 h-10"}
            multiplier={2.0}
            color="yellow"
          />
          <MultiplierButton
            className={"w-12 h-10"}
            multiplier={3.0}
            color={"blue"}
          />
        </div>
      </div>
    );
  }
);

PrizeWheel.displayName = "PrizeWheel";

export default PrizeWheel;
