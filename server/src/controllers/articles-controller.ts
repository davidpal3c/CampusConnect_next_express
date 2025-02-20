import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';
import { ArticleType } from '@prisma/client'; // Import the enum from Prisma

export interface AuthenticatedRequest extends Request {
    user?: any; 
}

// TODO - log operations (user_id, article_id, operation, timestamp)


// GET /api/articles/ - Get all articles
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

// GET /api/articles/categories - Get article categories
export const getArticleCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.articleCategory.findMany();
        res.status(200).json(categories);

    } catch (error) {
        console.log('Error fetching article categories:', error);
        res.status(500).json({ message: 'Server Error: error fetching article categories', error: error });    
    }
};

// GET /api/articles/type/:typeName - Get all articles of a specific type
export const getArticlesByType = async (req: Request, res: Response) => {
    try {
        let { typeName } = req.params;

        // typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1).toLowerCase(); TO DO: Change Enum to lowercase


        const articles = await prisma.article.findMany({
            where: { type: typeName as ArticleType }
        });

        res.status(200).json(articles);
    } catch (error) {
        console.log('Error fetching articles by type:', error);
        res.status(500).json({ message: 'Server Error: error fetching articles by type', error: error });
    }
};

// GET /api/articles/:id - Get a single article by ID
export const getArticleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const article = await prisma.article.findUnique({
            where: { article_id: id },
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
export const createArticle = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, content, imageURL, audience, status, type, author } = req.body;
        const email = req.user.decodedClaims.email;


        const authorId = await prisma.user.findUnique({
            where: { email: email },
            select: { user_id: true }
        })

        await prisma.article.create({
            data: {
                title: title,
                content: content,
                author_id: authorId?.user_id,
                imageUrl: imageURL ? imageURL : '',
                audience: audience,
                status: status,
                type: type,
                author: author,
            }
        });

        res.status(201).json({ message: 'Article created successfully' });
    } catch (error) {
        console.log('Error creating article:', error);
        res.status(500).json({ message: 'Server Error: error creating article', error: error });
    } finally {
        await prisma.$disconnect();
    }
}   


// PATCH /api/articles/:id - Update an article by ID. This is a partial update
export const updateArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { title, datePublished, content, 
            imageURL, audience, status, author_id, author, type } = req.body;

        const updateArticleData: any = {};

        if (title) updateArticleData.title = title;
        if (datePublished) updateArticleData.datePublished = datePublished;
        if (content) updateArticleData.content = content;
        if (imageURL) updateArticleData.imageURL = imageURL;
        if (audience) updateArticleData.audience = audience;
        if (status) updateArticleData.status = status;
        if (author_id) updateArticleData.author_id = author_id;
        if (author) updateArticleData.author = author;
        
        if (type && type === 'Pre-Arrivals' ) {
            updateArticleData.type = 'PreArrivals';
        } else if (type) updateArticleData.type = type;

        await prisma.article.update({
            where: { article_id: id },
            data: updateArticleData
        })

        res.status(200).json({ message: 'Article updated successfully' });
    } catch (error) {
        console.log('Error updating article:', error);
        res.status(500).json({ message: 'Server Error: error updating article', error: error });
    }
};

// PUT /api/articles/:id - Update an article by ID. This is a full update
export const updateArticleWhole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, datePublished, content, 
            imageURL, audience, status, author_id, author, type } = req.body;

        const updatedArticle = await prisma.article.update({
            where: { article_id: id },
            data: {
                title: title,
                datePublished: datePublished,
                content: content,
                author_id: author_id,
                imageUrl: imageURL,
                audience: audience,
                status: status,
                author: author,
                type: type
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
        const { id } = req.params;

        await prisma.article.delete({
            where: { article_id: id }
        });

        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: error deleting article', error: error });
        return;
    }
};

// DELETE /api/articles/ - Delete multiple articles
export const deleteArticles = async (req: Request, res: Response) => {
    try {
        let articleIds = await req.body.articleIds;
        console.log("Article Ids: ", articleIds);

        articleIds = Object.values(articleIds);
        console.log("Article Ids2: ", articleIds);

        if (!Array.isArray(articleIds) || articleIds.length === 0) {
            res.status(400).json({ message: 'Invalid request: articleIds must be an array' });
            return;
        }   

        await prisma.article.deleteMany({
            where: {
                article_id: { in: articleIds }      // Delete all articles with article_id in the array
            }   
        });

        res.status(200).json({ message: `Articles deleted successfully! (${articleIds.length})` });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: error deleting articles', error: error });   
        return;
    }
};