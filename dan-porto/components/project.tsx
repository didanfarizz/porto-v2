import Tabs from './tabs';

export default function Project() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="">
        <h1 className="bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text text-4xl font-bold">My Showcase Collection</h1>
      </div>
      <div className="py-10">
          <Tabs />
      </div>
    </div>
  );
}
