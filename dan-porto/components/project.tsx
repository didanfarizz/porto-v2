import Tabs from './tabs';

export default function Project() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center px-4">
        <h1 className="bg-gradient-to-r from-primary via-textMain to-textMain text-transparent bg-clip-text text-3xl sm:text-4xl font-bold">My Showcase Collection</h1>
      </div>
      <div className="py-6 sm:py-10 w-full">
        <Tabs />
      </div>
    </div>
  );
}
