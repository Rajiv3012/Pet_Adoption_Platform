#!/usr/bin/env node

/**
 * Quick Connection Test
 */

async function testConnection() {
  console.log('\n🔍 Testing Frontend-Backend Connection\n');
  
  const backendURL = 'http://127.0.0.1:5000';
  const frontendURL = 'http://127.0.0.1:5173';
  
  // Test 1: Backend Health
  console.log('1️⃣ Testing Backend Server...');
  try {
    const response = await fetch(backendURL);
    if (response.ok) {
      const text = await response.text();
      console.log(`   ✅ Backend is running: ${text}`);
    } else {
      console.log(`   ❌ Backend returned status: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Backend not accessible: ${error.message}`);
    console.log(`   💡 Make sure backend is running: cd backend && npm run dev`);
  }
  
  // Test 2: Frontend Health
  console.log('\n2️⃣ Testing Frontend Server...');
  try {
    const response = await fetch(frontendURL);
    if (response.ok) {
      console.log(`   ✅ Frontend is running`);
    } else {
      console.log(`   ❌ Frontend returned status: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Frontend not accessible: ${error.message}`);
    console.log(`   💡 Make sure frontend is running: cd frontend && npm run dev`);
  }
  
  // Test 3: Pets API
  console.log('\n3️⃣ Testing Pets API...');
  try {
    const response = await fetch(`${backendURL}/api/pets`);
    if (response.ok) {
      const pets = await response.json();
      console.log(`   ✅ Pets API working (${pets.length} pets found)`);
      if (pets.length > 0) {
        console.log(`   📝 Sample pet: ${pets[0].name} (ID: ${pets[0]._id})`);
      }
    } else {
      console.log(`   ❌ Pets API returned status: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Pets API failed: ${error.message}`);
  }
  
  // Test 4: CORS
  console.log('\n4️⃣ Testing CORS Configuration...');
  try {
    const response = await fetch(`${backendURL}/api/pets`, {
      headers: {
        'Origin': frontendURL
      }
    });
    const corsHeader = response.headers.get('access-control-allow-origin');
    if (corsHeader) {
      console.log(`   ✅ CORS configured: ${corsHeader}`);
    } else {
      console.log(`   ⚠️  CORS header not found`);
    }
  } catch (error) {
    console.log(`   ❌ CORS test failed: ${error.message}`);
  }
  
  console.log('\n📊 Summary:');
  console.log('   Backend URL: http://127.0.0.1:5000');
  console.log('   Frontend URL: http://127.0.0.1:5173');
  console.log('   API Base: http://127.0.0.1:5000/api');
  console.log('\n✨ If all tests pass, the connection is working!\n');
}

testConnection().catch(console.error);
