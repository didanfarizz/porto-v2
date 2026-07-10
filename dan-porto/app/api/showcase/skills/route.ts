import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const fallbackSkills = [
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

export async function GET() {
  try {
    if (!clientPromise) {
      console.log('MongoDB client promise is null. Falling back to local skills data.');
      return NextResponse.json(fallbackSkills);
    }
    const client = await clientPromise;
    const db = client.db();
    const skills = await db.collection('skills').find({}).toArray();
    
    if (skills.length === 0) {
      console.log('MongoDB skills collection is empty. Returning local skills data.');
      return NextResponse.json(fallbackSkills);
    }
    
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Failed to fetch skills from MongoDB, using fallback data:', error);
    return NextResponse.json(fallbackSkills);
  }
}
