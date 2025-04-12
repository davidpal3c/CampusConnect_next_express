import request from 'supertest';
import { app } from '../server';
import * as firebaseAdmin from 'firebase-admin';
import { prisma } from '../config/prismaClient';

jest.mock('../config/firebase', () => ({                                                   // Mock initializeFirebaseAdmin function
  initializeFirebaseAdmin: jest.fn(),
}));

jest.mock('firebase-admin', () => {                                                         // Mock Firebase Admin
  return {
    auth: jest.fn(() => ({
      verifyIdToken: jest.fn(),
      createSessionCookie: jest.fn(),
      setCustomUserClaims: jest.fn(),
      getUser: jest.fn(),
      verifySessionCookie: jest.fn(),
    })),
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn(),
    },
  };
});

// TC-006: User Login with valid credentials
jest.mock('../config/prismaClient', () => ({                                                    // Mock Prisma Client
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    student: {
      findUnique: jest.fn(),
    },
    alumni: {
      findUnique: jest.fn(),
    },
  },
}));

describe('User Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();                                                                       // Clear all mocks before each test
  });

  it('should log in user with valid credentials', async () => {
    const mockVerifyIdToken = jest.fn().mockResolvedValue({                                     // Mock Firebase Admin verifyIdToken
      uid: '123',
      email: 'user@example.com',
      picture: 'https://example.com/profile.jpg',
    });

    // Mock Firebase Admin getUser
    const mockGetUser = jest.fn().mockResolvedValue({
      uid: '123',
      customClaims: null,
    });

    const mockSetCustomUserClaims = jest.fn().mockResolvedValue(undefined);                     // Mock Firebase Admin setCustomUserClaims

    const mockCreateSessionCookie = jest.fn().mockResolvedValue('session-cookie-value');        // Mock Firebase Admin createSessionCookie

    (firebaseAdmin.auth as jest.Mock).mockReturnValue({                                         // Set up the mocked Firebase function
      verifyIdToken: mockVerifyIdToken,
      getUser: mockGetUser,
      setCustomUserClaims: mockSetCustomUserClaims,
      createSessionCookie: mockCreateSessionCookie,
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({                                   // Mock Prisma User findUnique for user fields
      user_id: '123',
      email: 'user@example.com',
      role: 'Student',
      first_name: 'John',
      last_name: 'Doe',
    });

    (prisma.student.findUnique as jest.Mock).mockResolvedValue({                                // Mock Prisma Student findUnique for student fields
      user_id: '123',
      program_id: 'CS101',
      program_name: 'Computer Science',
      department: 'Engineering',
      status: 'Active',
    });

    const response = await request(app)                                                         // Simulate a valid user login request
      .post('/api/auth/login-user')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    // Verify Firebase calls
    expect(mockVerifyIdToken).toHaveBeenCalledWith('valid-token');
    expect(mockGetUser).toHaveBeenCalledWith('123');
    expect(mockSetCustomUserClaims).toHaveBeenCalledWith('123', {
      role: 'Student',
    });
    expect(mockCreateSessionCookie).toHaveBeenCalledWith('valid-token', {
      expiresIn: 604800000, // 7 days in milliseconds
    });

    // assertions on response
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Welcome to Campus Connect!');
    expect(response.body.data).toEqual({
      user_id: '123',
      email: 'user@example.com',
      role: 'Student',
      first_name: 'John',
      last_name: 'Doe',
      studentFields: {
        user_id: '123',
        program_id: 'CS101',
        program_name: 'Computer Science',
        department: 'Engineering',
        status: 'Active',
      },
    });
    expect(response.headers['set-cookie']).toBeDefined();                                           // Check if session cookie is set
  });

// TC-007: User Login with Invalid Email (not found in DB)
  it('should return 404 if user email is not found', async () => {                                 // Mock Firebase Admin verifyIdToken
    const mockVerifyIdToken = jest.fn().mockResolvedValue({             
      uid: '456',
      email: 'unknown@example.com',
    });

    (firebaseAdmin.auth as jest.Mock).mockReturnValue({                                             // Set up the mocked Firebase function
      verifyIdToken: mockVerifyIdToken,
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);                                  // Mock Prisma User findUnique for non-existing user

    const response = await request(app)                                                             // Simulate a login request with an unauthorized email
      .post('/api/auth/login-user')
      .set('Authorization', 'Bearer valid-token')
      .send({});

    // assertions
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('User not found. Please contact support');
  });
});