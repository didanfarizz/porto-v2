const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

const uri = process.env.MONGODB_URI || 'mongodb+srv://didan:Dan123@cluster0.yajfr34.mongodb.net/portfolio?appName=Cluster0';

const cleanProjects = [
  {
    title: 'SIDIA - Mobile Expert System for Diabetes Diagnosis',
    category: 'Web & Mobile Development',
    image: '/sidia.jpg',
    link: 'https://www.threads.com/@didanfarizz/post/DbGgt1mExO6?xmt=AQG0lQQtNOG5uEns6N80HN4pdJucwSFBE_QIVfx0OogK1g',
    github: 'https://github.com/didanfarizz/sidia',
    techStack: ['Flutter', 'FastAPI', 'Firebase', 'Forward Chaining', 'Certainty Factor', 'AI Chatbot'],
    description: 'Final Year Project (Thesis): Android-based early diabetes risk screening app using Forward Chaining & Certainty Factor reasoning, integrated with an NLP AI chatbot assistant. Validated by 3 medical doctors (CVI 1.00), tested by 20+ academic users with a 94% UAT feasibility score (Excellent category), and achieved a 100% functional testing success rate.',
  },
  {
    title: 'BREWSTOCK - Inventory Management System',
    category: 'Web & Mobile Development',
    image: '/scooter.png',
    link: '#',
    github: 'https://github.com/didanfarizz',
    techStack: ['Laravel', 'Bootstrap', 'MySQL', 'BNSP Assessment'],
    description: 'BNSP Competency Assessment Project: Comprehensive stock tracking, asset auditing, and transaction reporting platform.',
  },
  {
    title: 'ASY-SYIFA - Mineral Water Ordering System',
    category: 'Web & Mobile Development',
    image: '/asy-syifa.png',
    link: '#',
    github: 'https://github.com/didanfarizz/asy-syifa',
    techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    description: 'Freelance Project: E-commerce order processing and delivery distribution portal for mineral water suppliers.',
  },
  {
    title: 'TechnoFair 11 | Website',
    category: 'Web & Mobile Development',
    image: '/tf.png',
    link: '#',
    github: 'https://github.com/PtiBemFikti/Fikti-App/tree/master/src/components/technofair',
    techStack: ['Next.js', 'React', 'TailwindCSS', 'TypeScript'],
    description: 'Official national technology event portal handling registration and competition workflows.',
  },
  {
    title: 'Pemira 2024-2025 | Website',
    category: 'Web & Mobile Development',
    image: '/pemira.png',
    link: '#',
    github: 'https://github.com/PtiBemFikti/Fikti-App/tree/master/src/components/pemira',
    techStack: ['Next.js', 'React', 'TailwindCSS', 'Framer Motion'],
    description: 'Digital student election platform providing secure candidate presentation & live stats.',
  },
  {
    title: 'My Portfolio V1 | Website',
    category: 'Web & Mobile Development',
    image: '/porto-v1.png',
    link: 'https://web-didanfarizz-portfolio.netlify.app/',
    github: 'https://github.com/didanfarizz/myPortfolio',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    description: 'First iteration portfolio showcasing early front-end projects and design experiments.',
  },
  {
    title: 'Breast Cancer Classification',
    category: 'Machine Learning',
    image: '/breast-cancer.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Breast-Cancer-Classifier---Logistic-Regression',
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'Logistic Regression'],
    description: 'Predictive diagnostic model classifying malignant vs benign tumor features with high recall.',
  },
  {
    title: 'Flight Price Prediction',
    category: 'Machine Learning',
    image: '/harga.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Flight-Price-Prediction-2025---Regression',
    techStack: ['Python', 'XGBoost', 'Scikit-Learn', 'Streamlit'],
    description: 'Regression analysis system forecasting flight ticket fares based on seasonal & airline factors.',
  },
  {
    title: 'Adult Salary Prediction',
    category: 'Machine Learning',
    image: '/gaji.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Adult-Sallary-Classifier---KNN-Models',
    techStack: ['Python', 'KNN', 'Matplotlib', 'Seaborn'],
    description: 'Socio-economic income level classifier evaluating demographic features and education thresholds.',
  },
  {
    title: 'Gym Member Classification',
    category: 'Machine Learning',
    image: '/member.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Classification-Gym-Member-Experience-KNN-Models',
    techStack: ['Python', 'K-Nearest Neighbors', 'Pandas', 'EDA'],
    description: 'Fitness activity pattern analyzer predicting member retention and exercise experience tiers.',
  },
  {
    title: 'Depression Classification',
    category: 'Machine Learning',
    image: '/depresi.png',
    link: '#',
    github: 'https://github.com/didanfarizz/Depression-Classification-KNN-Models',
    techStack: ['Python', 'KNN', 'Scikit-Learn', 'Data Mining'],
    description: 'Mental health assessment classifier detecting depression risk indicators from survey metrics.',
  },
];

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas.');

    const db = client.db('portfolio');
    const projectsCollection = db.collection('projects');

    console.log('Clearing old documents from "projects" collection...');
    const deleteResult = await projectsCollection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} old documents from "projects".`);

    console.log('Inserting updated clean projects list...');
    const insertResult = await projectsCollection.insertMany(cleanProjects);
    console.log(`Successfully pushed ${insertResult.insertedCount} updated projects to MongoDB Atlas!`);

  } catch (error) {
    console.error('Error seeding MongoDB Atlas:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

seedDatabase();
