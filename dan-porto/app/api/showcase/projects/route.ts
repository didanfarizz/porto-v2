import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const fallbackProjects = [
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

export async function GET() {
  try {
    if (!clientPromise) {
      console.log('MongoDB client promise is null. Falling back to local projects data.');
      return NextResponse.json(fallbackProjects);
    }
    const client = await clientPromise;
    const db = client.db();
    const projects = await db.collection('projects').find({}).toArray();
    
    if (projects.length === 0) {
      console.log('MongoDB projects collection is empty. Returning local projects data.');
      return NextResponse.json(fallbackProjects);
    }
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects from MongoDB, using fallback data:', error);
    return NextResponse.json(fallbackProjects);
  }
}
