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
      return NextResponse.json(fallbackSkills);
    }

    const mongoQuery = async () => {
      const client = await clientPromise;
      if (!client) return fallbackSkills;
      const db = client.db();
      const skills = await db
        .collection('skills')
        .find({}, { projection: { name: 1, iconUrl: 1 } })
        .limit(30)
        .toArray();

      if (!skills || skills.length === 0) return fallbackSkills;
      return skills;
    };

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('MongoDB timeout')), 1000)
    );

    const result = await Promise.race([mongoQuery(), timeoutPromise]);
    return NextResponse.json(result);
  } catch (error) {
    console.warn('Skills API using fast local fallback:', error);
    return NextResponse.json(fallbackSkills);
  }
}
