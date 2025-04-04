import express from 'express';
import { verifySession, adminRoute, validatePermissions } from '../middleware/user-middleware';
import { getAllArticles, getArticleTypes ,getArticlesByType, getArticleById, 
    createArticle, createArticleType, updateArticle, updateArticleWhole, updateArticleType, 
    deleteArticle, deleteArticles, deleteArticleType} from '../controllers/articles-controller';

const router = express.Router();

// GET /api/articles/ - Get all articles
router.get('/', verifySession, getAllArticles);

// GET /api/articles/types/ - Get all article types
router.get('/types/', verifySession, getArticleTypes);

// GET /api/articles/type/:typeName/count - Get article count by type
// router.get('/type/:typeName/count', verifySession, getArticleCountByType);

// GET /api/articles/type/counts - Get article counts by type
// router.get('/types/counts', verifySession, getArticleCountsByType);

// GET /api/articles/type/:typeId - Get all articles of a specific type
router.get('/types/:typeId', verifySession, getArticlesByType);

// GET /api/articles/:id - Get a single article by ID
router.get('/:id', verifySession, getArticleById);

// POST: /api/articles/ - Create new article
router.post('/', verifySession, adminRoute, validatePermissions(['Read-Write', 'Full Access']), createArticle);

// POST: /api/articles/types/ - Create new article type
router.post('/types/', verifySession, adminRoute, validatePermissions(['Full Access']), createArticleType);

// PATCH /api/articles/:id - Update an article by ID. This is a partial update
router.patch('/:id', verifySession, validatePermissions(['Read-Write', 'Full Access']), updateArticle);

// PATCH /api/articles/types/:typeId - Update article type by name 
router.patch('/types/:typeId', verifySession, adminRoute, validatePermissions(['Full Access']), updateArticleType);

// PUT /api/articles/:id - Update an article by ID. This is a full update
router.put('/:id', verifySession, adminRoute, validatePermissions(['Full Access']), updateArticleWhole);

// DELETE /api/articles/:id - Delete an article by ID
router.delete('/:id', verifySession, adminRoute, validatePermissions(['Full Access']), deleteArticle);

// DELETE /api/articles/ - Delete multiple articles
router.delete('/', verifySession, adminRoute, validatePermissions(['Full Access']), deleteArticles);

// DELETE /api/articles/types/:typeId - Delete an article type by name
router.delete('/types/:typeId', verifySession, adminRoute, validatePermissions(['Full Access']), deleteArticleType);

export default router;

