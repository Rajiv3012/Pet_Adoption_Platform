import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'https://pet-adoption-platform-1-s9bq.onrender.com/api';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@petadoption.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function testAdminAPI() {
  try {
    console.log('🧪 Testing Admin API...');
    console.log('🌐 API Base URL:', API_BASE_URL);
    
    // Step 1: Login as admin
    console.log('1. Logging in as admin...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    
    console.log('✅ Login successful');
    console.log('👤 User:', user.name, '- Role:', user.role);
    
    // Step 2: Test admin stats endpoint
    console.log('\n2. Testing admin stats endpoint...');
    const statsResponse = await axios.get(`${API_BASE_URL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Stats endpoint working');
    console.log('📊 Stats:', statsResponse.data.stats);
    
    // Step 3: Test admin shelters endpoint
    console.log('\n3. Testing admin shelters endpoint...');
    const sheltersResponse = await axios.get(`${API_BASE_URL}/admin/shelters`, {
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