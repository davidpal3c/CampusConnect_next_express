import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';


// TODO - log operations (user_id, article_id, operation, timestamp)


// GET /api/users/ - Get all articles
export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const articles = await prisma.article.findMany();
        res.status(200).json(articles);
    } catch (error) {
        console.log('Error fetching articles:', error);
        res.status(500).json({ message: 'Server Error: error fetching articles', error: error });
    } finally {
        await prisma.$disconnect();
    }
}

// GET /api/users/:id - Get a single article by ID
export const getArticleById = async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;

        const article = await prisma.article.findUnique({
            where: { article_id: articleId },
        })

        if (!article) {
            res.status(404).json({ error: 'Article not found' });
            return; 
        }

        res.status(200).json(article);  
        return;
    } catch (error) {
        console.log('Error fetching article:', error);  
        res.status(500).json({ message: 'Server Error: error fetching article', error: error });
    } finally {
        await prisma.$disconnect();
    }
}
    
// POST /api/articles/ - Create a new article
export const createArticle = async (req: Request, res: Response) => {
    try {
        const { title, content, author_id, imageURL, audience } = req.body;

        const newArticle = await prisma.article.create({
            data: {
                title: title,
                content: content,
                author: author_id,
                imageUrl: imageURL,
                audience: audience
            }
        });

        res.status(201).json(newArticle);
    } catch (error) {
        console.log('Error creating article:', error);
        res.status(500).json({ message: 'Server Error: error creating article', error: error });
    } finally {
        await prisma.$disconnect();
    }
}   


// PATCH /api/articles/:id - Update an article by ID. This is a partial update
// export const updateArticle = async (req: Request, res: Response) => {};


// PUT /api/articles/:id - Update an article by ID. This is a full update
export const updateArticle = async (req: Request, res: Response) => {
    try {
        const { article_id } = req.params;
        const { title, content, author_id, imageURL, audience } = req.body;

        const updatedArticle = await prisma.article.update({
            where: { article_id: article_id },
            data: {
                title: title,
                content: content,
                author: author_id,
                imageUrl: imageURL,
                audience: audience
            }
        }); 

        res.status(200).json(updatedArticle);
        return;                
    } catch (error) {
        console.log('Error updating article:', error);
        res.status(500).json({ message: 'Server Error: error updating article', error: error });
        return;
    }
};

// DELETE /api/articles/:id - Delete an article by ID
export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const { article_id } = req.params;

        await prisma.article.delete({
            where: { article_id: article_id }
        });

        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: error deleting article', error: error });
    }
};