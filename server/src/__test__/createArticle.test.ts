import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';
import { createArticle } from '../controllers/articles-controller';

describe('SQL Injection Test for createArticle', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(async () => {
    await prisma.user.create({
      data: {
        user_id: 'test-user-id',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        role: 'Admin',
        password: 'password',
      },
    });

    await prisma.articleType.create({
      data: {
        type_id: 'test-type-id',
        name: 'Test Type',
      },
    });
  });

  afterAll(async () => {
    await prisma.article.deleteMany();
    await prisma.articleType.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(() => {
    req = {
      body: {},
      user: {
        decodedClaims: {
          email: 'test@example.com',
          role: 'Admin',
          permissions: 'Full Access',
        },
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  //TC-015: SQL Injection Test for createArticle
  it('should safely handle SQL injection attempt in createArticle', async () => {
    const maliciousInput = "'; DROP TABLE Article; --";

    req.body = {
      title: maliciousInput,                     
      content: 'This is a test article content.',
      imageUrl: 'https://example.com/image.jpg',
      audience: 'Public',
      status: 'Published',
      type_id: 'test-type-id',
      author: 'Test Author',
    };

    await createArticle(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);             // Expect status 201
    expect(res.json).toHaveBeenCalledWith({ message: 'Article created successfully' });

    // Verify that the Article table contains the new article
    const articles = await prisma.article.findMany();
    expect(articles.length).toBe(1); 


    const createdArticle = articles[0];                                           // Verify that the malicious input was treated as a regular string
    expect(createdArticle.title).toBe(maliciousInput);                            // Malicious input is stored as-is, data in the database is not affected
  });
});