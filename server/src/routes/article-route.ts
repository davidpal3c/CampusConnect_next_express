import express from 'express';
import { verifySession, protectRoute } from '../middleware/user-middleware';
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '../controllers/articles-controller';

const router = express.Router();

// GET /api/articles/ - Get all articles
router.get('/', verifySession, getAllArticles);

// GET /api/articles/:id - Get a single article by ID
router.get('/:id', verifySession, getArticleById);

// POST: /api/articles/ - Create a new article
router.post('/', verifySession, protectRoute(['Read-Write', 'Full Access']), createArticle);

// PATCH /api/articles/:id - Update an article by ID. This is a partial update
// router.patch('/:id', verifySession, protectRoute(['Read-Write', 'Full Access']), updateArticle);

// PUT /api/articles/:id - Update an article by ID. This is a full update
router.put('/:id', verifySession, protectRoute(['Full Access']), updateArticle);

// DELETE /api/articles/:id - Delete an article by ID
router.delete('/:id', verifySession, protectRoute(['Full Access']), deleteArticle);


export default router;