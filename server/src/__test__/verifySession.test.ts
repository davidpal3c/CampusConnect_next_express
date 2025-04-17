import { Request, Response, NextFunction } from 'express';
import { verifySession } from '../middleware/adminAuth-middleware';
import admin from 'firebase-admin';

// custom error type with `code` property
interface FirebaseError extends Error {
  code?: string;
}

jest.mock('firebase-admin', () => ({
  auth: jest.fn(() => ({
    verifySessionCookie: jest.fn(),
  })),
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
}));

jest.mock('../config/firebase', () => ({
  initializeFirebaseAdmin: jest.fn(),
}));

describe('verifySession Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should allow access with a valid session cookie', async () => {
    (admin.auth().verifySessionCookie as jest.Mock).mockResolvedValue({                 // Mock Firebase Admin verifySessionCookie
      uid: '123',
      email: 'test@example.com',
    });

    req.cookies = { session: 'valid-session-cookie' };

    await verifySession(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it('should reject access with an invalid session cookie', async () => {             // Mock Firebase Admin verifySessionCookie to throw an error
    (admin.auth().verifySessionCookie as jest.Mock).mockRejectedValue(
      new Error('Invalid session cookie')
    );

    req.cookies = { session: 'invalid-session-cookie' };

    await verifySession(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Unauthorized',
      error: 'Invalid session cookie',
    });
  });

  // it('should reject access with a revoked session cookie', async () => {
  //   const revokedError: FirebaseError = new Error('Session cookie has been revoked');
  //   revokedError.code = 'auth/session-cookie-revoked';

  //   (admin.auth().verifySessionCookie as jest.Mock).mockRejectedValue(revokedError);                // Mock Firebase Admin verifySessionCookie to throw the custom error

  //   req.cookies = { session: 'revoked-session-cookie' };

  //   await verifySession(req as Request, res as Response, next);

  //   expect(res.status).toHaveBeenCalledWith(403);
  //   expect(res.json).toHaveBeenCalledWith({
  //     status: 'error',
  //     message: 'Unauthorized: Session has been revoked',
  //   });
  // });

  // it('should reject access with no session cookie', async () => {
  //   await verifySession(req as Request, res as Response, next);

  //   expect(res.status).toHaveBeenCalledWith(403);
  //   expect(res.json).toHaveBeenCalledWith({
  //     status: 'error',
  //     message: 'Unauthorized: Session cookie is missing',
  //   });
  // });
});