import express from 'express';
import { verifySession, adminRoute, validatePermissions } from '../middleware/user-middleware';
import { getAllArticles, getArticleTypes ,getArticlesByType, getArticleById, 
    createArticle, updateArticle, updateArticleWhole, deleteArticle, deleteArticles } from '../controllers/articles-controller';

const router = express.Router();

// GET /api/articles/ - Get all articles
router.get('/', verifySession, getAllArticles);

// GET /api/articles/types/ - Get all article types
router.get('/type/', verifySession, getArticleTypes);

// GET /api/articles/type/:typeName - Get all articles of a specific type
router.get('/type/:typeName', verifySession, getArticlesByType);

// GET /api/articles/:id - Get a single article by ID
router.get('/:id', verifySession, getArticleById);

// POST: /api/articles/ - Create a new article
router.post('/', verifySession, adminRoute, validatePermissions(['Read-Write', 'Full Access']), createArticle);

// PATCH /api/articles/:id - Update an article by ID. This is a partial update
router.patch('/:id', verifySession, validatePermissions(['Read-Write', 'Full Access']), updateArticle);

// PUT /api/articles/:id - Update an article by ID. This is a full update
router.put('/:id', verifySession, adminRoute, validatePermissions(['Full Access']), updateArticleWhole);

// DELETE /api/articles/:id - Delete an article by ID
router.delete('/:id', verifySession, adminRoute, validatePermissions(['Full Access']), deleteArticle);

// DELETE /api/articles/ - Delete multiple articles
router.delete('/', verifySession, adminRoute, validatePermissions(['Full Access']), deleteArticles);

export default router;

