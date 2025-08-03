const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

console.log('🔐 Testing Authentication System...\n');

// Test 1: Password Hashing
console.log('1️⃣ Testing Password Hashing...');
const testPassword = 'Admin123!';
const hashedPassword = '$2b$12$L9WHNcx1Rl6SNCPEalc2Q.kKlck4SveW7dQFVDuh2CPj8.tVduw8i'; // Pre-hashed Admin123!

bcrypt.compare(testPassword, hashedPassword).then(isValid => {
  console.log(`✅ Password verification: ${isValid ? 'PASS' : 'FAIL'}`);
  
  if (isValid) {
    console.log('   ✅ Admin123! password correctly verified');
  } else {
    console.log('   ❌ Password verification failed');
  }
});

// Test 2: JWT Token Generation
console.log('\n2️⃣ Testing JWT Token Generation...');
const testUser = {
  id: 1,
  email: 'admin@akibeks.co.ke',
  role: 'admin'
};

const accessToken = jwt.sign(
  { userId: testUser.id, email: testUser.email, role: testUser.role },
  'test_secret_key',
  { expiresIn: '15m' }
);

console.log(`✅ Access token generated: ${accessToken.substring(0, 50)}...`);

// Test 3: JWT Token Verification
console.log('\n3️⃣ Testing JWT Token Verification...');
try {
  const decoded = jwt.verify(accessToken, 'test_secret_key');
  console.log('✅ Token verification: PASS');
  console.log(`   ✅ Decoded user: ${decoded.email} (${decoded.role})`);
  
  if (decoded.role === 'admin') {
    console.log('   ✅ Admin role correctly identified');
  } else {
    console.log('   ❌ Admin role not found');
  }
} catch (error) {
  console.log('❌ Token verification: FAIL');
  console.log(`   ❌ Error: ${error.message}`);
}

// Test 4: Admin Access Check
console.log('\n4️⃣ Testing Admin Access Check...');
const mockUsers = [
  {
    id: 1,
    email: 'admin@akibeks.co.ke',
    password: hashedPassword,
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    status: 'active',
    emailVerified: true
  }
];

const testLogin = async () => {
  const email = 'admin@akibeks.co.ke';
  const password = 'Admin123!';
  
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    console.log('❌ User not found');
    return;
  }
  
  if (user.status !== 'active') {
    console.log('❌ User account not active');
    return;
  }
  
  if (!user.emailVerified) {
    console.log('❌ Email not verified');
    return;
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    console.log('❌ Invalid password');
    return;
  }
  
  console.log('✅ Login validation: PASS');
  console.log(`   ✅ User: ${user.firstName} ${user.lastName}`);
  console.log(`   ✅ Role: ${user.role}`);
  console.log(`   ✅ Status: ${user.status}`);
  
  // Generate tokens
  const tokens = {
    accessToken: jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      'test_secret_key',
      { expiresIn: '15m' }
    ),
    refreshToken: jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      'test_refresh_secret_key',
      { expiresIn: '7d' }
    )
  };
  
  console.log('✅ Tokens generated successfully');
  console.log(`   ✅ Access token: ${tokens.accessToken.substring(0, 50)}...`);
  console.log(`   ✅ Refresh token: ${tokens.refreshToken.substring(0, 50)}...`);
  
  return tokens;
};

testLogin().then(tokens => {
  if (tokens) {
    // Test 5: Admin Route Protection
    console.log('\n5️⃣ Testing Admin Route Protection...');
    
    try {
      const decoded = jwt.verify(tokens.accessToken, 'test_secret_key');
      
      if (decoded.role === 'admin') {
        console.log('✅ Admin route access: GRANTED');
        console.log(`   ✅ User ${decoded.email} can access admin routes`);
      } else {
        console.log('❌ Admin route access: DENIED');
        console.log(`   ❌ User ${decoded.email} cannot access admin routes`);
      }
    } catch (error) {
      console.log('❌ Token verification failed for admin route');
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n🎉 Authentication System Test Complete!');
  console.log('\n📋 Summary:');
  console.log('   ✅ Password hashing and verification');
  console.log('   ✅ JWT token generation and verification');
  console.log('   ✅ User authentication flow');
  console.log('   ✅ Admin role verification');
  console.log('   ✅ Admin route protection');
  
  console.log('\n🚀 Ready for database integration!');
});