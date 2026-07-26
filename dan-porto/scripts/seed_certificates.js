const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

const uri = process.env.MONGODB_URI || 'mongodb+srv://didan:Dan123@cluster0.yajfr34.mongodb.net/portfolio?appName=Cluster0';

const cleanCertificates = [
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

async function seedCertificates() {
  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas.');

    const db = client.db('portfolio');
    const certsCollection = db.collection('certificates');

    console.log('Clearing old certificates from collection...');
    const deleteResult = await certsCollection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} old certificates.`);

    console.log('Inserting updated certificates list...');
    const insertResult = await certsCollection.insertMany(cleanCertificates);
    console.log(`Successfully seeded ${insertResult.insertedCount} certificates into MongoDB Atlas!`);

  } catch (error) {
    console.error('Error seeding certificates in MongoDB Atlas:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

seedCertificates();
