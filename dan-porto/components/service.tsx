export default function Service() {
  return (
    <div className="px-20 py-10 flex justify-center items-center flex-col bg-foreground">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-white to-[#fefefe] text-transparent bg-clip-text">My Quality Services</h1>
      <div className="py-10 flex justify-between items-center">
        <div className="w-full flex justify-start items-center gap-20 text-white font-bold">
          <p className="text-purple text-xl">01</p>
          <h2 className="text-2xl">Front-End Web Development</h2>
        </div>
        <div className="">
          <p>Designing engaging, intuitive, and responsive interfaces to enhance user experience and engagement. Effectively collaborating with designers, developers, and stakeholders to transform ideas into functional and innovative digital solutions.</p>
        </div>
      </div>
      <div className="py-10 flex justify-between items-center">
        <div className="w-full flex justify-start items-center gap-20 text-white font-bold">
          <p className="text-purple text-xl">02</p>
          <h2 className="text-2xl">Data Analyst</h2>
        </div>
        <div className="">
          <p>Designing engaging, intuitive, and responsive interfaces to enhance user experience and engagement. Effectively collaborating with designers, developers, and stakeholders to transform ideas into functional and innovative digital solutions.</p>
        </div>
      </div>
    </div>
  );
}
