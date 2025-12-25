import axios from 'axios';

async function testAdminAPI() {
  try {
    console.log('🧪 Testing Admin API...');
    
    // Step 1: Login as admin
    console.log('1. Logging in as admin...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@pethaven.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    
    console.log('✅ Login successful');
    console.log('👤 User:', user.name, '- Role:', user.role);
    
    // Step 2: Test admin stats endpoint
    console.log('\n2. Testing admin stats endpoint...');
    const statsResponse = await axios.get('http://localhost:5000/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Stats endpoint working');
    console.log('📊 Stats:', statsResponse.data.stats);
    
    // Step 3: Test admin shelters endpoint
    console.log('\n3. Testing admin shelters endpoint...');
    const sheltersResponse = await axios.get('http://localhost:5000/api/admin/shelters', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Shelters endpoint working');
    console.log('🏠 Shelters count:', sheltersResponse.data.shelters.length);
    
    console.log('\n🎉 All admin API endpoints are working!');
    
  } catch (error) {
    console.error('❌ Error testing admin API:', error.response?.data || error.message);
  }
}

testAdminAPI();