import Blob from './blob';

export default function Dashboard() {
  return (
    <div className="text-white">
      <div className="flex flex-wrap justify-between items-center px-40 py-16">
        <div className="w-1/2 flex flex-col space-y-4">
          <h3 className="font-bold text-2xl">I am Didan</h3>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-white text-transparent bg-clip-text">Web Developer & Data Analyst</h1>{' '}
          <p className="">Welcome to my Portfolio! Bringing ideas to life with clean code & data-driven insights. 🚀</p>
        </div>
        <div className="w-1/2 flex justify-center items-center">
            <Blob />
            Hallo
        </div>
      </div>
    </div>
  );
}
