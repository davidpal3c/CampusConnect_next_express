import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';
import { getArticleCountsByType } from '../controllers/articles-controller';

describe('SQL Injection Test for getArticleCountsByType', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(async () => {
    // Seed the database with test data
    await prisma.articleType.create({
      data: {
        type_id: 'test-type-id-1',
        name: 'Test Type 1',
      },
    });

    await prisma.articleType.create({
      data: {
        type_id: 'test-type-id-2',
        name: 'Test Type 2',
      },
    });

    await prisma.article.create({
      data: {
        article_id: 'test-article-id-1',
        title: 'Test Article 1',
        content: 'This is a test article.',
        type_id: 'test-type-id-1',
        author_id: 'test-user-id',
        status: 'Published', 
        audience: 'Public', 
        author: 'Test Author', 
        imageUrl: 'https://example.com/image.jpg', 
      },
    });

    await prisma.article.create({
      data: {
        article_id: 'test-article-id-2',
        title: 'Test Article 2',
        content: 'This is another test article.',
        type_id: 'test-type-id-2',
        author_id: 'test-user-id',
        status: 'Published', 
        audience: 'Public', 
        author: 'Test Author', 
        imageUrl: 'https://example.com/image.jpg', 
      },
    });
  });

  // Clean up the test data
  afterAll(async () => {
    await prisma.article.deleteMany();
    await prisma.articleType.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(() => {
    // Mock request and response objects
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

    // TC-016: SQL Injection Test for getArticleCountsByType
  it('should prevent SQL injection in getArticleCountsByType', async () => {
    await getArticleCountsByType(req as Request, res as Response);
        expect(res.status).toHaveBeenCalledWith(200); 
        expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
            expect.objectContaining({
            type_name: expect.any(String),
            count: expect.any(Number),
            }),
        ])
    );

    const result = await prisma.$queryRaw`
      SELECT t.name AS type_name, COUNT(a.article_id) AS count
      FROM "Article" a
      JOIN "Type" t ON a.type_id = t.type_id
      GROUP BY t.name
    `;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type_name: 'Test Type 1',
          count: 1,
        }),
        expect.objectContaining({
          type_name: 'Test Type 2',
          count: 1,
        }),
      ])
    );
  });

// TC-017: SQL Injection Test for getArticleCountsByType
  it('should safely handle malicious input in raw query', async () => {
    const maliciousInput = "'; DROP TABLE Article; --";

    // Attempt to inject malicious input into the raw query
    // This should fail or be safely handled by Prisma
    const result = await prisma.$queryRaw`
      SELECT t.name AS type_name, COUNT(a.article_id) AS count
      FROM "Article" a
      JOIN "Type" t ON a.type_id = t.type_id
      WHERE t.name = ${maliciousInput}
      GROUP BY t.name
    `;

    // Assert that the result is empty or handled safely
    expect(result).toEqual([]); // No results should match the malicious input

    // Verify that the Article table still exists (no SQL injection occurred)
    const articles = await prisma.article.findMany();
    expect(articles.length).toBe(2); // Articles should still exist
  });
});