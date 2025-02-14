export default function Service() {
  return (
    <div className="px-20 py-10 flex justify-center items-center flex-col bg-foreground">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-white to-[#fefefe] text-transparent bg-clip-text">My Quality Services</h1>
      <div className="py-10 flex justify-between items-center">
        <div className="w-1/2 flex justify-start items-center gap-20 text-white font-bold">
          <p className="text-purple text-xl">01</p>
          <h2 className="text-2xl">Front-End Web Development</h2>
        </div>
        <div className="w-1/2">
          <p>Designing engaging, intuitive, and responsive interfaces to enhance user experience and engagement. Effectively collaborating with designers, developers, and stakeholders to transform ideas into functional and innovative digital solutions.</p>
        </div>
      </div>
      <div className="py-10 flex justify-between items-center">
        <div className="w-1/2 flex justify-start items-center gap-20 text-white font-bold">
          <p className="text-purple text-xl">02</p>
          <h2 className="text-2xl">Machine Learning</h2>
        </div>
        <div className="w-1/2">
          <p>Processing, analyzing, and transforming data using statistical techniques and machine learning, combined with optimal feature engineering to enhance model accuracy and derive valuable insights.</p>
        </div>
      </div>
      <div className="py-10 flex justify-between items-center">
        <div className="w-1/2 flex justify-start items-center gap-20 text-white font-bold">
          <p className="text-purple text-xl">03</p>
          <h2 className="text-2xl">Web Design</h2>
        </div>
        <div className="w-1/2">
          <p>Designing intuitive user flows and ensuring accessibility to accommodate a diverse range of users. Developing wireframes and interactive prototypes in Figma to visualize concepts and enhance the overall user experience.</p>
        </div>
      </div>
    </div>
  );
}
