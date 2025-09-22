export default function Service() {
  const services = [
    {
      id: '01',
      name: 'FullStack Web Development',
      description:
        'Designing and developing robust end-to-end digital solutions, from intuitive and responsive interfaces to scalable server-side logic. Effectively collaborating with designers, developers, and stakeholders to transform ideas into functional and innovative digital products.',
    },
    {
      id: '02',
      name: 'Machine Learning',
      description: 'Processing, analyzing, and transforming data using statistical techniques and machine learning, combined with optimal feature engineering to enhance model accuracy and derive valuable insights.',
    },
    {
      id: '03',
      name: 'UI / UX',
      description:
        'Designing intuitive user flows and ensuring accessibility to accommodate a diverse range of users. Developing wireframes and interactive prototypes in Figma to visualize concepts and enhance the overall user experience.',
    },
  ];

  return (
    <div className="px-20 py-10 flex justify-center items-center flex-col bg-foreground">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-white to-[#fefefe] text-transparent bg-clip-text">My Quality Services</h1>
      {services.map((services, index) => (
        <div key={index} className="py-10 flex justify-between items-center">
          <div className="w-1/2 flex justify-start items-center gap-20 text-white font-bold">
            <p className="text-purple text-xl">{ services.id }</p>
            <h2 className="text-2xl">{ services.name }</h2>
          </div>
          <div className="w-1/2 text-white">
            <p>{ services.description }</p>
          </div>
        </div>
      ))}
    </div>
  );
}
