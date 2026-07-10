import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const fallbackCertificates = [
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

export async function GET() {
  try {
    if (!clientPromise) {
      console.log('MongoDB client promise is null. Falling back to local certificates data.');
      return NextResponse.json(fallbackCertificates);
    }
    const client = await clientPromise;
    const db = client.db();
    const certificates = await db.collection('certificates').find({}).toArray();
    
    if (certificates.length === 0) {
      console.log('MongoDB certificates collection is empty. Returning local certificates data.');
      return NextResponse.json(fallbackCertificates);
    }
    
    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Failed to fetch certificates from MongoDB, using fallback data:', error);
    return NextResponse.json(fallbackCertificates);
  }
}
