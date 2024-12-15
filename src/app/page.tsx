import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col items-center">
        <Image
          src="/pick.svg"
          width={60}
          height={60}
          className="object-contain"
          alt=""
        />
        <div className="w-full spin h-[300px] relative">
          <Image src="/wheel.svg" alt="wheel" fill />
          <div className="absolute text-white  top-1/2 left-1/2 transform ">
            <p>4.00x</p>
          </div>
        </div>
      </div>
    </div>
  );
}
