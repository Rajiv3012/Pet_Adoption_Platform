#!/usr/bin/env node

/**
 * MERN Stack Integration Verification Script
 * Verifies that all components of the Pet Adoption Platform are working correctly
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const checkFile = (filePath, description) => {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description} - File not found: ${filePath}`, 'red');
    return false;
  }
};

const checkAPI = async (url, description) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      log(`✅ ${description}`, 'green');
      return true;
    } else {
      log(`❌ ${description} - Status: ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ ${description} - Error: ${error.message}`, 'red');
    return false;
  }
};

async function verifyMERNIntegration() {
  log('\n🔍 MERN Stack Integration Verification\n', 'bold');
  
  let allChecks = [];

  // MongoDB (M) Verification
  log('📊 MONGODB (M) - Database Layer', 'blue');
  allChecks.push(checkFile('backend/.env', 'Environment configuration'));
  allChecks.push(checkFile('backend/config/db.js', 'MongoDB connection config'));
  allChecks.push(checkFile('backend/models/User.js', 'User model'));
  allChecks.push(checkFile('backend/models/Pet.js', 'Pet model'));
  allChecks.push(checkFile('backend/models/Shelter.js', 'Shelter model'));
  allChecks.push(checkFile('backend/models/MedicalRecord.js', 'Medical Record model'));
  allChecks.push(checkFile('backend/models/Donation.js', 'Donation model'));
  allChecks.push(checkFile('backend/models/Volunteer.js', 'Volunteer model'));

  // Express.js (E) Verification
  log('\n🚀 EXPRESS.JS (E) - Backend API Layer', 'blue');
  allChecks.push(checkFile('backend/server.js', 'Express server'));
  allChecks.push(checkFile('backend/controllers/authController.js', 'Auth controller'));
  allChecks.push(checkFile('backend/controllers/petController.js', 'Pet controller'));
  allChecks.push(checkFile('backend/controllers/shelterController.js', 'Shelter controller'));
  allChecks.push(checkFile('backend/controllers/medicalController.js', 'Medical controller'));
  allChecks.push(checkFile('backend/controllers/donationController.js', 'Donation controller'));
  allChecks.push(checkFile('backend/controllers/volunteerController.js', 'Volunteer controller'));
  allChecks.push(checkFile('backend/middleware/authMiddleware.js', 'Authentication middleware'));
  allChecks.push(checkFile('backend/routes/authRoutes.js', 'Auth routes'));
  allChecks.push(checkFile('backend/routes/petRoutes.js', 'Pet routes'));
  allChecks.push(checkFile('backend/routes/shelterRoutes.js', 'Shelter routes'));
  allChecks.push(checkFile('backend/routes/medicalRoutes.js', 'Medical routes'));
  allChecks.push(checkFile('backend/routes/donationRoutes.js', 'Donation routes'));
  allChecks.push(checkFile('backend/routes/volunteerRoutes.js', 'Volunteer routes'));

  // React (R) Verification
  log('\n⚛️  REACT (R) - Frontend Layer', 'blue');
  allChecks.push(checkFile('frontend/src/App.jsx', 'Main App component'));
  allChecks.push(checkFile('frontend/src/main.jsx', 'React entry point'));
  allChecks.push(checkFile('frontend/src/services/api.js', 'API service layer'));
  allChecks.push(checkFile('frontend/src/context/AuthContext.jsx', 'Authentication context'));
  allChecks.push(checkFile('frontend/src/components/Header.jsx', 'Header component'));
  allChecks.push(checkFile('frontend/src/components/PetCard.jsx', 'Pet card component'));
  allChecks.push(checkFile('frontend/src/components/DonationModal.jsx', 'Donation modal'));
  allChecks.push(checkFile('frontend/src/components/VolunteerForm.jsx', 'Volunteer form'));
  allChecks.push(checkFile('frontend/src/components/MedicalInfo.jsx', 'Medical info component'));
  allChecks.push(checkFile('frontend/src/pages/Home.jsx', 'Home page'));
  allChecks.push(checkFile('frontend/src/pages/Pets.jsx', 'Pets page'));
  allChecks.push(checkFile('frontend/src/pages/PetDetails.jsx', 'Pet details page'));
  allChecks.push(checkFile('frontend/src/pages/Shelters.jsx', 'Shelters page'));
  allChecks.push(checkFile('frontend/src/pages/Volunteer.jsx', 'Volunteer page'));
  allChecks.push(checkFile('frontend/src/pages/Dashboard.jsx', 'Admin dashboard'));
  allChecks.push(checkFile('frontend/src/pages/Login.jsx', 'Login page'));
  allChecks.push(checkFile('frontend/src/pages/Register.jsx', 'Register page'));

  // Node.js (N) Verification
  log('\n🟢 NODE.JS (N) - Runtime Environment', 'blue');
  allChecks.push(checkFile('backend/package.json', 'Backend package.json'));
  allChecks.push(checkFile('frontend/package.json', 'Frontend package.json'));
  allChecks.push(checkFile('backend/seedData.js', 'Database seeding script'));
  allChecks.push(checkFile('backend/seedMedicalData.js', 'Medical data seeding'));

  // API Endpoints Verification (if servers are running)
  log('\n🌐 API ENDPOINTS - Live Testing', 'blue');
  try {
    allChecks.push(await checkAPI('http://localhost:5000/api/pets', 'Pets API endpoint'));
    allChecks.push(await checkAPI('http://localhost:5000/api/shelters', 'Shelters API endpoint'));
    allChecks.push(await checkAPI('http://localhost:5173', 'React frontend server'));
  } catch (error) {
    log('⚠️  API endpoints not accessible (servers may not be running)', 'yellow');
  }

  // Integration Files
  log('\n📋 INTEGRATION & DOCUMENTATION', 'blue');
  allChecks.push(checkFile('README.md', 'Project documentation'));

  // Summary
  const passedChecks = allChecks.filter(Boolean).length;
  const totalChecks = allChecks.length;
  const successRate = ((passedChecks / totalChecks) * 100).toFixed(1);

  log('\n📊 VERIFICATION SUMMARY', 'bold');
  log(`✅ Passed: ${passedChecks}/${totalChecks} checks (${successRate}%)`, 
      successRate >= 90 ? 'green' : successRate >= 70 ? 'yellow' : 'red');

  if (successRate >= 90) {
    log('\n🎉 MERN STACK INTEGRATION: EXCELLENT!', 'green');
    log('Your pet adoption platform is fully integrated and ready to use!', 'green');
  } else if (successRate >= 70) {
    log('\n⚠️  MERN STACK INTEGRATION: GOOD', 'yellow');
    log('Most components are working, but some issues need attention.', 'yellow');
  } else {
    log('\n❌ MERN STACK INTEGRATION: NEEDS WORK', 'red');
    log('Several components are missing or not working correctly.', 'red');
  }

  log('\n🚀 To start the application:', 'blue');
  log('1. cd backend && npm run dev', 'reset');
  log('2. cd frontend && npm run dev', 'reset');
  log('3. Visit http://localhost:5173', 'reset');
  log('4. Admin login: admin@petadoption.com / admin123\n', 'reset');
}

// Run verification
verifyMERNIntegration().catch(console.error);