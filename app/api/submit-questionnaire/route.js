import { MongoClient } from 'mongodb';

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
  }

  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function POST(request) {
  try {
    const formData = await request.json();
    
    const client = await connectToDatabase();
    const db = client.db('AUIngenious'); // Replace with your database name
    const collection = db.collection('UserPreference');
    
    // Process the form data
    const processedData = {
      ...formData,
      createdAt: new Date()
    };
    
    // Insert the data into MongoDB
    const result = await collection.insertOne(processedData);
    
    console.log(`Data saved to MongoDB with id: ${result.insertedId}`);
    client.close();
    
    return Response.json({ 
      success: true, 
      id: result.insertedId.toString() 
    });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 