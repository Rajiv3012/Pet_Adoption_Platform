import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

async function viewAllUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all users
    const users = await User.find({});
    
    console.log('\n📊 ALL REGISTERED USERS:');
    console.log('========================');
    
    if (users.length === 0) {
      console.log('No users found in database.');
    } else {
      users.forEach((user, index) => {
        console.log(`\n👤 User ${index + 1}:`);
        console.log(`   ID: ${user._id}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Password (hashed): ${user.password}`);
        console.log(`   Google ID: ${user.googleId || 'Not linked'}`);
        console.log(`   Profile Picture: ${user.profilePicture || 'None'}`);
        console.log(`   Created: ${user.createdAt || 'Unknown'}`);
        console.log(`   Updated: ${user.updatedAt || 'Unknown'}`);
      });
      
      console.log(`\n📈 Total Users: ${users.length}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the script
viewAllUsers();