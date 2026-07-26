import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const fallbackCertificates = [
  {
    title: 'The Complete Full-Stack Web Development Bootcamp - Udemy',
    image: '/sertif-4.png',
  },
  {
    title: 'Dart & Flutter Development Bootcamp: Find House App - BuildWithAngga',
    image: '/sertif-5.png',
  },
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
      return NextResponse.json(fallbackCertificates);
    }

    const mongoQuery = async () => {
      const client = await clientPromise;
      if (!client) return fallbackCertificates;
      const db = client.db('portfolio');
      const certificates = await db
        .collection('certificates')
        .find({}, { projection: { title: 1, image: 1 } })
        .limit(20)
        .toArray();

      if (!certificates || certificates.length === 0) return fallbackCertificates;
      return certificates;
    };

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('MongoDB timeout')), 1000)
    );

    const result = await Promise.race([mongoQuery(), timeoutPromise]);
    return NextResponse.json(result);
  } catch (error) {
    console.warn('Certificates API using fast local fallback:', error);
    return NextResponse.json(fallbackCertificates);
  }
}
