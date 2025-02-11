import Blob from './blob';
import CardImage from './image';
import Sosmed from './sosmed';

export default function Dashboard() {
  return (
    <div className="text-white">
      <div className="flex flex-wrap justify-between mx-auto items-center px-20 py-16">
        <div className="w-1/2 flex flex-col space-y-4">
          <h3 className="font-bold text-2xl">I am Didan</h3>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-white text-transparent bg-clip-text">Web Developer & Data Analyst</h1>{' '}
          <p className="">Welcome to my Portfolio! Bringing ideas to life with clean code & data-driven insights. 🚀</p>
          <div className="flex justify-start items-start">
            <Sosmed />
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center mx-auto">
          <Blob />
          <div className="pr-32 pb-10">
            <CardImage />
          </div>
        </div>
      </div>
    </div>
  );
}
