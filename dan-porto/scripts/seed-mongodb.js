const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;

if (!uri || uri.includes('<username>')) {
  console.error('ERROR: Please configure a valid MONGODB_URI in your .env file before seeding.');
  process.exit(1);
}

const projects = [
  {
    title: 'TechnoFair 11 | Website',
    category: 'Web Development',
    image: '/tf.png',
    link: 'https://bemfikti-gunadarma.web.id/technofair',
    github: 'https://github.com/PtiBemFikti/Fikti-App/tree/master/src/components/technofair',
  },
  {
    title: 'Pemira 2024-2025 | Website',
    category: 'Web Development',
    image: '/pemira.png',
    link: 'https://bemfikti-gunadarma.web.id/pemira',
    github: 'https://github.com/PtiBemFikti/Fikti-App/tree/master/src/components/pemira',
  },
  {
    title: 'My Portfolio V1 | Website',
    category: 'Web Development',
    image: '/porto-v1.png',
    link: 'https://web-didanfarizz-portfolio.netlify.app/',
    github: 'https://github.com/didanfarizz/myPortfolio',
  },
  {
    title: 'ScooTer | Website',
    category: 'Web Development',
    image: '/scooter.png',
    link: 'https://scooter-app-beta.vercel.app/',
    github: 'https://github.com/didanfarizz/scooTer',
  },
  {
    title: 'Asy-Syifa | Website',
    category: 'Web Development',
    image: '/asy-syifa.png',
    link: 'https://asy-syifa.xo.je/',
    github: 'https://github.com/didanfarizz/asy-syifa',
  },
  {
    title: 'Breast Cancer Classification | Machine Learning',
    category: 'Machine Learning',
    image: '/breast-cancer.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Breast-Cancer-Classifier---Logistic-Regression',
  },
  {
    title: 'Flight Price Prediction | Machine Learning',
    category: 'Machine Learning',
    image: '/harga.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Flight-Price-Prediction-2025---Regression',
  },
  {
    title: 'Adult Salary Prediction | Machine Learning',
    category: 'Machine Learning',
    image: '/gaji.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Adult-Sallary-Classifier---KNN-Models',
  },
  {
    title: 'Gym Member Classification | Machine Learning',
    category: 'Machine Learning',
    image: '/member.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Classification-Gym-Member-Experience-KNN-Models',
  },
  {
    title: 'Depression Classification | Machine Learning',
    category: 'Machine Learning',
    image: '/depresi.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Depression-Classification-KNN-Models',
  },
  {
    title: 'ScooTer | UIUX',
    category: 'UIUX Design',
    image: '/scooter-design.png',
    link: 'https://www.figma.com/design/wovPXQJNuzpfcdycd6J7eQ/Scooter-Website---PBW?m=auto&t=m98ncYAntmCcx2EY-6',
    github: '#',
  },
  {
    title: 'SwiftRide | UIUX',
    category: 'UIUX Design',
    image: '/swiftride.png',
    link: 'https://www.figma.com/design/scQGgo7aMVvUWAkpS8Q5Bg/SwiftRide?m=auto&t=m98ncYAntmCcx2EY-6',
    github: '#',
  },
];

const certificates = [
  {
    title: 'Article Writing Competition - Universitas Gunadarma',
    image: '/sertif-1.jpg',
  },
  {
    title: 'Building a Career as Software Developer - Dicoding',
    image: '/sertif-2.jpg',
  },
  {
    title: 'Programming Logic Introduction - Dicoding',
    image: '/sertif-3.jpg',
  },
];

const skills = [
  { name: 'HTML', iconUrl: '/icons/HTML5.png' },
  { name: 'CSS', iconUrl: '/icons/CSS3.png' },
  { name: 'JavaScript', iconUrl: '/icons/JavaScript.png' },
  { name: 'React.js', iconUrl: '/icons/React.png' },
  { name: 'Next.js', iconUrl: '/icons/Next.js.png' },
  { name: 'Vite', iconUrl: '/icons/Vite.js.png' },
  { name: 'Node.js', iconUrl: '/icons/Node.js.png' },
  { name: 'Laravel', iconUrl: '/icons/Laravel.png' },
  { name: 'CodeIgniter', iconUrl: '/icons/CodeIgniter.png' },
  { name: 'Tailwind CSS', iconUrl: '/icons/Tailwind.png' },
  { name: 'Bootstrap', iconUrl: '/icons/Bootstrap.png' },
  { name: 'MySQL', iconUrl: '/icons/MySQL.png' },
  { name: 'Git', iconUrl: '/icons/Git.png' },
  { name: 'Python', iconUrl: '/icons/Python.png' },
  { name: 'Figma', iconUrl: '/icons/Figma.png' },
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db();

    // 1. Seed Projects
    console.log('Seeding projects...');
    const projectsCol = db.collection('projects');
    await projectsCol.deleteMany({});
    await projectsCol.insertMany(projects);
    console.log(`Successfully seeded ${projects.length} projects.`);

    // 2. Seed Certificates
    console.log('Seeding certificates...');
    const certsCol = db.collection('certificates');
    await certsCol.deleteMany({});
    await certsCol.insertMany(certificates);
    console.log(`Successfully seeded ${certificates.length} certificates.`);

    // 3. Seed Skills
    console.log('Seeding skills...');
    const skillsCol = db.collection('skills');
    await skillsCol.deleteMany({});
    await skillsCol.insertMany(skills);
    console.log(`Successfully seeded ${skills.length} skills.`);

    console.log('Database seeding completed successfully! 🎉');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await client.close();
  }
}

seed();
