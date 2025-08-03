import request from 'supertest';
import app from './server.ts.news'; // Adjust import to your Express app

describe('Admin API Security', () => {
  let adminToken: string;

  beforeAll(async () => {
    // Login as admin and get JWT
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'adminpassword' });
    adminToken = res.body.accessToken;
  });

  it('should deny access to admin routes without token', async () => {
    const res = await request(app).get('/api/admin/dashboard');
    expect(res.status).toBe(401);
  });

  it('should allow access to admin routes with valid token', async () => {
    const res = await request(app)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });

  it('should deny access to admin routes for non-admin users', async () => {
    // Simulate login as a regular user
    const userRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'userpassword' });
    const userToken = userRes.body.accessToken;

    const res = await request(app)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });

  it('should log admin actions in the audit log', async () => {
    await request(app)
      .post('/api/admin/projects')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test Project' });

    const logs = await request(app)
      .get('/api/admin/audit')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(logs.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ action: expect.stringContaining('POST /api/admin/projects') })
      ])
    );
  });

  it('should prevent SQL injection in admin endpoints', async () => {
    const res = await request(app)
      .post('/api/admin/projects')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: "'; DROP TABLE users; --" });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});