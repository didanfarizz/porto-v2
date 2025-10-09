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
    <div className="px-4 md:px-20 py-10 flex justify-center items-center flex-col bg-foreground">
      {/* 2. Ukuran font judul responsif dan rata tengah */}
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-white to-[#fefefe] text-transparent bg-clip-text text-center mb-8">
        My Quality Services
      </h1>

      {/* Menambahkan div pembungkus untuk mapping agar mudah di-style */}
      <div className="w-full">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="w-full py-10 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-8 border-b border-gray-700 last:border-b-0"
          >
            <div className="w-full lg:w-1/2 flex justify-start items-center gap-8 text-white font-bold">
              <p className="text-purple text-xl">{service.id}</p>
              <h2 className="text-xl md:text-2xl">{service.name}</h2>
            </div>
            
            {/* Kolom Kanan (Deskripsi) */}
            <div className="w-full lg:w-1/2 text-white/80">
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}