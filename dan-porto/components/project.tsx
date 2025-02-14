import Tabs from "./tabs";

export default function Project() {
  return (
    <div className="flex justify-center items-center">
      <div className="">
        <h1 className="bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text text-4xl font-bold">My Recent Project</h1>
        <div className="">
            <Tabs />
        </div>
      </div>
    </div>
  );
}
