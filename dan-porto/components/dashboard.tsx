import Blob from './blob';
import CardImage from './image';
import Sosmed from './sosmed';
import DownloadCv from './DownloadCv';

export default function Dashboard() {
  return (
    <div className="text-white">
      <div className="flex flex-wrap justify-between mx-auto items-center px-20 py-16">
        <div className="w-1/2 flex flex-col space-y-4">
          <h3 className="text-4xl font-bold">Hi, I&apos;m Didan</h3>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text">Web Developer &</h1>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text">ML Engineer</h1>
          <p className="">
            Welcome to my Portfolio! I am an Information Systems student with a strong passion for Front-End Development and Machine Learning Engineering. I enjoy exploring the latest technologies, innovating in digital development, and
            crafting creative solutions for every challenge. With a commitment to quality and attention to detail, I strive to deliver the best experience in every project I undertake. 🚀
          </p>
          <div className="flex justify-start items-start">
            <Sosmed />
          </div>
          <div className="">
            <DownloadCv />
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
