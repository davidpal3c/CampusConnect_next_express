import request from 'supertest';
import { app } from '../server';
import * as firebaseAdmin from 'firebase-admin';
import { prisma } from '../config/prismaClient';

// Mock initializeFirebaseAdmin function
jest.mock('../config/firebase', () => ({
  initializeFirebaseAdmin: jest.fn(),
}));

// Mock Firebase Admin
jest.mock('firebase-admin', () => {
  return {
    auth: jest.fn(() => ({
      verifyIdToken: jest.fn(),
      createSessionCookie: jest.fn(),
      setCustomUserClaims: jest.fn(),
      getUser: jest.fn(),
    })),
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn(),
    },
  };
});

// Mock Prisma Client
jest.mock('../config/prismaClient', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    admin: {
      findUnique: jest.fn(),
    },
  },
}));

describe('Admin Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();                                               // clears all mocks before each test
  });

  it('should log in admin with valid credentials', async () => {
    // Mock Firebase Admin verifyIdToken
    const mockVerifyIdToken = jest.fn().mockResolvedValue({
      uid: '123',
      email: 'admin@example.com',
      picture: 'https://example.com/profile.jpg',
    });
    
// TC-001: Admin Login with valid credentials                  
    const mockGetUser = jest.fn().mockResolvedValue({                  // Mock Firebase Admin getUser
      uid: '123',
      customClaims: null,
    });
    
    // Mock Firebase Admin setCustomUserClaims
    const mockSetCustomUserClaims = jest.fn().mockResolvedValue(undefined);
    
    // Mock Firebase Admin createSessionCookie
    const mockCreateSessionCookie = jest.fn().mockResolvedValue('session-cookie-value');
    
    // Set up the mocked firebase function
    (firebaseAdmin.auth as jest.Mock).mockReturnValue({
      verifyIdToken: mockVerifyIdToken,
      getUser: mockGetUser,
      setCustomUserClaims: mockSetCustomUserClaims,
      createSessionCookie: mockCreateSessionCookie,
    });

    // Mock Prisma User findUnique for admin user
    (prisma.user.findUnique as jest.Mock).mockImplementation(({ where }) => {
      if (where.email === 'admin@example.com') {
        return Promise.resolve({
          user_id: '123',
          email: 'admin@example.com',
          role: 'Admin',
          first_name: 'John',
          last_name: 'Doe',
        });
      }
      return Promise.resolve(null);
    });

    // Mock Prisma Admin findUnique
    (prisma.admin.findUnique as jest.Mock).mockResolvedValue({
      user_id: '123',
      permissions: ['Read-Write', 'Full Access'],
    });
    
    // Mock Prisma User update for setUserImage
    (prisma.user.update as jest.Mock).mockResolvedValue({
      user_id: '123',
      email: 'admin@example.com',
      role: 'Admin',
      first_name: 'John',
      last_name: 'Doe',
      image_url: 'https://example.com/profile.jpg',
    });

    const response = await request(app)
      .post('/api/auth/login-admin')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    // Verify Firebase calls
    expect(mockVerifyIdToken).toHaveBeenCalledWith('valid-token');
    expect(mockGetUser).toHaveBeenCalledWith('123');
    expect(mockSetCustomUserClaims).toHaveBeenCalledWith('123', {
      role: 'Admin',
      permissions: ['Read-Write', 'Full Access'],
    });
    expect(mockCreateSessionCookie).toHaveBeenCalledWith('valid-token', {
      expiresIn: 604800000,                                 // 7 days in milliseconds
    });

    // Assertions on response
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe(
      'Welcome to Campus Connect Admin Portal! John Doe'
    );
    expect(response.body.data).toEqual({
      user_id: '123',
      email: 'admin@example.com',
      role: 'Admin',
      first_name: 'John',
      last_name: 'Doe',
      permission: ['Read-Write', 'Full Access'],
    });
    expect(response.headers['set-cookie']).toBeDefined(); // Check if session cookie is set
  });

  it('should return 403 if user is not an admin', async () => {
    // Mock Firebase Admin verifyIdToken
    const mockVerifyIdToken = jest.fn().mockResolvedValue({
      uid: '456',
      email: 'user@example.com',
    });
    
    // Set up the mocked function
    (firebaseAdmin.auth as jest.Mock).mockReturnValue({
      verifyIdToken: mockVerifyIdToken,
      getUser: jest.fn(),
      setCustomUserClaims: jest.fn(),
      createSessionCookie: jest.fn(),
    });

//TC-003: Admin Login with Invalid permissions     // Mock Prisma User findUnique for non-admin user  </permissions>
    (prisma.user.findUnique as jest.Mock).mockImplementation(({ where }) => {
      if (where.email === 'user@example.com') {
        return Promise.resolve({
          user_id: '456',
          email: 'user@example.com',
          role: 'User',                  
          first_name: 'Jane',
          last_name: 'Smith',
        });
      }
      return Promise.resolve(null);
    });

    // Simulate a login request with a non-admin user
    const response = await request(app)
      .post('/api/auth/login-admin')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    // Assertions
    expect(response.statusCode).toBe(403);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe(
      'Forbidden Access: Admin privileges required. Please contact support.'
    );
  });

  it('should return 500 if an internal server error occurs', async () => {
    // Mock Firebase Admin verifyIdToken to throw an error
    const mockVerifyIdToken = jest.fn().mockRejectedValue(
      new Error('Internal Server Error')
    );
    
    // Set up the mocked function
    (firebaseAdmin.auth as jest.Mock).mockReturnValue({
      verifyIdToken: mockVerifyIdToken,
      getUser: jest.fn(),
      setCustomUserClaims: jest.fn(),
      createSessionCookie: jest.fn(),
    });

    // Simulate a login request that triggers an internal server error
    const response = await request(app)
      .post('/api/auth/login-admin')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    // Assertions
    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Internal Server Error');
  });
  
  it('should return 400 if no token is provided', async () => {
    // Simulate a login request without a token
    const response = await request(app)
      .post('/api/auth/login-admin')
      .send({});

    // Assertions
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Invalid request: id token not provided');
  });
  
// TC-002: Admin Login: user logs in with invalid credentials (email)
  it('should return 404 if user is not found', async () => {      
    // Mock Firebase Admin verifyIdToken
    const mockVerifyIdToken = jest.fn().mockResolvedValue({
      uid: '789',
      email: 'unknown@example.com',
    });
    
    // Set up the mocked function
    (firebaseAdmin.auth as jest.Mock).mockReturnValue({
      verifyIdToken: mockVerifyIdToken,
      getUser: jest.fn(),
      setCustomUserClaims: jest.fn(),
      createSessionCookie: jest.fn(),
    });

    // Mock Prisma User findUnique to return null (user not found)
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    // Simulate a login request with a non-existing user
    const response = await request(app)
      .post('/api/auth/login-admin')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    // Assertions
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('User not found. Please contact support');
  });

  it('should return 401 if invalid credentials are provided', async () => {
    // Mock Firebase Admin verifyIdToken to reject invalid token
    const mockVerifyIdToken = jest.fn().mockRejectedValue(
      new Error('Invalid token')
    );

    // Set up the mocked function
    (firebaseAdmin.auth as jest.Mock).mockReturnValue({
      verifyIdToken: mockVerifyIdToken,
      getUser: jest.fn(),
      setCustomUserClaims: jest.fn(),
      createSessionCookie: jest.fn(),
    });

    // Simulate a login request with invalid credentials
    const response = await request(app)
      .post('/api/auth/login-admin')
      .set('Authorization', 'Bearer invalid-token')
      .send({});

    // Assertions
    expect(response.statusCode).toBe(401);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Invalid token');
  });
});