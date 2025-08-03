const express = require('express');
const app = express();

app.use(express.json());

// Mock admin routes for testing
app.get('/api/admin/test', (req, res) => {
  res.json({
    success: true,
    message: '🔓 Authentication bypassed - Admin access granted',
    data: {
      user: {
        id: 1,
        email: 'admin@akibeks.co.ke',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User'
      },
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/api/admin/health', (req, res) => {
  res.json({
    success: true,
    message: '🔓 Authentication bypassed - Health check passed',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// Test all admin endpoints
app.get('/api/admin/projects', (req, res) => {
  res.json({
    success: true,
    message: '🔓 Projects endpoint - Authentication bypassed',
    data: {
      projects: [],
      pagination: { page: 1, limit: 10, total: 0 }
    }
  });
});

app.get('/api/admin/invoices', (req, res) => {
  res.json({
    success: true,
    message: '🔓 Invoices endpoint - Authentication bypassed',
    data: {
      invoices: [],
      pagination: { page: 1, limit: 20, total: 0 }
    }
  });
});

app.get('/api/admin/services', (req, res) => {
  res.json({
    success: true,
    message: '🔓 Services endpoint - Authentication bypassed',
    data: {
      services: [],
      pagination: { page: 1, limit: 10, total: 0 }
    }
  });
});

app.get('/api/admin/analytics/financial', (req, res) => {
  res.json({
    success: true,
    message: '🔓 Analytics endpoint - Authentication bypassed',
    data: {
      revenue: 0,
      expenses: 0,
      profit: 0,
      period: 'month'
    }
  });
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`🔓 Authentication bypass test server running on port ${PORT}`);
  console.log('\n📋 Test endpoints:');
  console.log('   GET  /api/admin/test - Test admin access');
  console.log('   GET  /api/admin/health - Health check');
  console.log('   GET  /api/admin/projects - Projects endpoint');
  console.log('   GET  /api/admin/invoices - Invoices endpoint');
  console.log('   GET  /api/admin/services - Services endpoint');
  console.log('   GET  /api/admin/analytics/financial - Analytics endpoint');
  console.log('\n🚀 Test with curl:');
  console.log('   curl http://localhost:5002/api/admin/test');
  console.log('\n⚠️  AUTHENTICATION IS DISABLED FOR TESTING');
  console.log('   All admin routes are now accessible without authentication');
});