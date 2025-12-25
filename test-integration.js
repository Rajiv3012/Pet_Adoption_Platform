#!/usr/bin/env node

/**
 * Frontend-Backend Integration Test
 * Tests the actual API communication between React frontend and Express backend
 */

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

async function testIntegration() {
  log('\n🔗 Frontend-Backend Integration Test\n', 'bold');
  
  const backendURL = 'http://localhost:5000';
  const frontendURL = 'http://localhost:5173';
  
  let passedTests = 0;
  let totalTests = 0;

  // Test 1: Backend Server Health
  log('📡 Testing Backend Server...', 'cyan');
  totalTests++;
  try {
    const response = await fetch(`${backendURL}/api/pets`);
    if (response.ok) {
      const data = await response.json();
      log(`✅ Backend server is running (Found ${data.length} pets)`, 'green');
      passedTests++;
    } else {
      log(`❌ Backend server returned status: ${response.status}`, 'red');
    }
  } catch (error) {
    log(`❌ Backend server is not accessible: ${error.message}`, 'red');
  }

  // Test 2: Frontend Server Health
  log('\n🌐 Testing Frontend Server...', 'cyan');
  totalTests++;
  try {
    const response = await fetch(frontendURL);
    if (response.ok) {
      log('✅ Frontend server is running', 'green');
      passedTests++;
    } else {
      log(`❌ Frontend server returned status: ${response.status}`, 'red');
    }
  } catch (error) {
    log(`❌ Frontend server is not accessible: ${error.message}`, 'red');
  }

  // Test 3: CORS Configuration
  log('\n🔐 Testing CORS Configuration...', 'cyan');
  totalTests++;
  try {
    const response = await fetch(`${backendURL}/api/pets`, {
      headers: {
        'Origin': frontendURL
      }
    });
    const corsHeader = response.headers.get('access-control-allow-origin');
    if (corsHeader) {
      log('✅ CORS is properly configured', 'green');
      passedTests++;
    } else {
      log('⚠️  CORS headers not found (may cause issues)', 'yellow');
    }
  } catch (error) {
    log(`❌ CORS test failed: ${error.message}`, 'red');
  }

  // Test 4: API Endpoints
  log('\n🎯 Testing API Endpoints...', 'cyan');
  const endpoints = [
    { path: '/api/pets', name: 'Pets' },
    { path: '/api/shelters', name: 'Shelters' },
    { path: '/api/volunteers', name: 'Volunteers' },
    { path: '/api/donations', name: 'Donations' }
  ];

  for (const endpoint of endpoints) {
    totalTests++;
    try {
      const response = await fetch(`${backendURL}${endpoint.path}`);
      if (response.ok) {
        const data = await response.json();
        log(`✅ ${endpoint.name} endpoint working (${data.length} records)`, 'green');
        passedTests++;
      } else {
        log(`❌ ${endpoint.name} endpoint failed: ${response.status}`, 'red');
      }
    } catch (error) {
      log(`❌ ${endpoint.name} endpoint error: ${error.message}`, 'red');
    }
  }

  // Test 5: MongoDB Connection
  log('\n💾 Testing Database Connection...', 'cyan');
  totalTests++;
  try {
    const response = await fetch(`${backendURL}/api/pets`);
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        log(`✅ MongoDB is connected and has data (${data.length} pets)`, 'green');
        passedTests++;
      } else {
        log('⚠️  MongoDB connected but no data found', 'yellow');
      }
    }
  } catch (error) {
    log(`❌ Database connection test failed: ${error.message}`, 'red');
  }

  // Test 6: Sample Pet Data
  log('\n🐾 Testing Pet Data Structure...', 'cyan');
  totalTests++;
  try {
    const response = await fetch(`${backendURL}/api/pets`);
    if (response.ok) {
      const pets = await response.json();
      if (pets.length > 0) {
        const samplePet = pets[0];
        const requiredFields = ['name', 'species', 'breed', 'age', 'shelter'];
        const hasAllFields = requiredFields.every(field => samplePet.hasOwnProperty(field));
        
        if (hasAllFields) {
          log(`✅ Pet data structure is correct`, 'green');
          log(`   Sample: ${samplePet.name} (${samplePet.species})`, 'reset');
          passedTests++;
        } else {
          log('❌ Pet data structure is incomplete', 'red');
        }
      }
    }
  } catch (error) {
    log(`❌ Pet data test failed: ${error.message}`, 'red');
  }

  // Summary
  log('\n📊 INTEGRATION TEST SUMMARY', 'bold');
  const successRate = ((passedTests / totalTests) * 100).toFixed(1);
  log(`✅ Passed: ${passedTests}/${totalTests} tests (${successRate}%)`, 
      successRate >= 90 ? 'green' : successRate >= 70 ? 'yellow' : 'red');

  if (successRate === 100) {
    log('\n🎉 PERFECT INTEGRATION!', 'green');
    log('Frontend and Backend are fully integrated and communicating properly!', 'green');
  } else if (successRate >= 80) {
    log('\n✅ GOOD INTEGRATION!', 'green');
    log('Most components are working correctly.', 'green');
  } else if (successRate >= 60) {
    log('\n⚠️  PARTIAL INTEGRATION', 'yellow');
    log('Some components need attention.', 'yellow');
  } else {
    log('\n❌ INTEGRATION ISSUES', 'red');
    log('Several components are not working correctly.', 'red');
  }

  log('\n🌐 Access Points:', 'blue');
  log(`   Frontend: ${frontendURL}`, 'cyan');
  log(`   Backend:  ${backendURL}`, 'cyan');
  log(`   API Docs: ${backendURL}/api`, 'cyan');
  log('\n');
}

// Run the test
testIntegration().catch(console.error);
