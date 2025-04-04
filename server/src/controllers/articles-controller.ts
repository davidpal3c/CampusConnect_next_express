import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';
// import { ArticleType } from '@prisma/client'; // Import the enum from Prisma

export interface AuthenticatedRequest extends Request {
    user?: any; 
}

// TODO - log operations (user_id, article_id, operation, timestamp)


// GET /api/articles/ - Get all articles
export const getAllArticles = async (req: Request, res: Response) => {
    try {
        // const articles = await prisma.article.findMany();

        const articles = await prisma.article.findMany({
            include: {
                type: {
                    select: { name: true }
                }
            } as any
        });

        res.status(200).json(articles);
        return;
    } catch (error) {
        console.log('Error fetching articles:', error);
        res.status(500).json({ message: 'Server Error: error fetching articles', error: error });
        return;
    } finally {
        await prisma.$disconnect();
    }
}

// GET /api/articles/categories - Get article categories
// export const getArticleCategories = async (req: Request, res: Response) => {
//     try {
//         const categories = await prisma.articleCategory.findMany();
//         res.status(200).json(categories);

//     } catch (error) {
//         console.log('Error fetching article categories:', error);
//         res.status(500).json({ message: 'Server Error: error fetching article categories', error: error });    
//     }
// };


// GET /api/articles/type - Get article types
export const getArticleTypes = async (req: Request, res: Response) => {
    try {
        const articleTypesData = await prisma.articleType.findMany();

        res.status(200).json(articleTypesData);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: error fetching article types', error: error });
        return;
    } finally {
        await prisma.$disconnect();
    }
};

// GET /api/articles/type/:typeName/count - Get article count by type
export const getArticleCountByType = async (req: Request, res: Response) => {
    try {
        const { typeName } = req.params;
        const typeCount = await prisma.article.count({
            where: { type: { name: typeName } }
        });
        res.status(200).json({ count: typeCount });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Server Error: error fetching article count by type', error: error });
        return;
    } finally {
        await prisma.$disconnect();
    }
};


// GET /api/articles/type/counts - Get article type counts
// export  const getArticleCountsByType = async (req: Request, res: Response) => {
//     try {
//         // // fetch article counts grouped by type_id
//         // const typeCounts = await prisma.article.groupBy({
//         //     by: ['type_id'],
//         //     _count: {
//         //         article_id: true
//         //     }
//         // });

//         // // fetch all article types to map type_id to type name
//         // const articleTypes = await prisma.articleType.findMany({
//         //     select: {
//         //         type_id: true,
//         //         name: true,
//         //     }
//         // })

//         // // map of type_id (key) to type name (value)
//         // const typeMap = articleTypes.reduce((acc: any, type: any) => {
//         //     acc[type.type_id] = type.name;
//         //     return acc;
//         // }, {});

//         // // transform result to include type names
//         // // map over the typeCounts array to include the type_name in the result using the typeMap.
//         // const result = typeCounts.map((count: any) => ({
//         //     type_id: count.type_id,
//         //     type_name: typeMap[count.type_id],
//         //     count: count._count.article_id 
//         // }));

//         // // console.log("Type Counts: ", typeCounts);   
//         // console.log("Article Type Counts: ", result);

//         const result = await prisma.$queryRaw`
//             SELECT t.name AS type_name, COUNT(a.article_id) AS count
//             FROM "Article" a
//             JOIN "Type" t ON a.type_id = t.type_id
//             GROUP BY t.name
//         `;

//         // [
//         //     { type_name: "Pre-Arrival", count: 2 },
//         //     { type_name: "Campus Life", count: 2 },
//         //     { type_name: "General", count: 1 },
//         // ]

//         console.log("Type Counts with Names: ", result);
//         res.status(200).json(result);
//         return;
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error: error fetching article type count', error: error });
//         return;
//     } finally {
//         await prisma.$disconnect();
//     }
// };

// GET /api/articles/type/:typeId - Get all articles of a specific type
export const getArticlesByType = async (req: Request, res: Response) => {
    try {
        let { typeId } = req.params;

        // typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1).toLowerCase(); TO DO: Change Enum to lowercase
        // const articleType = await prisma.articleType.findUnique({
        //     where: { name: typeId }
        // });
        
        // if (!articleType) {
        //     res.status(404).json({ error: 'Article type not found' });
        //     return;
        // }

        // const articles = await prisma.article.findMany({
        //     where: { type_id: articleType.type_id } as any
        // });

        const articles = await prisma.article.findMany({
            where: { type_id: typeId } as any,
            include: {
                type: {
                    select: { name: true }
                }
            } as any
        });

        res.status(200).json(articles);
        return;
    } catch (error) {
        console.log('Error fetching articles by type:', error);
        res.status(500).json({ message: 'Server Error: error fetching articles by type', error: error });
        return;
    } finally {
        await prisma.$disconnect();
    }
};

// GET /api/articles/audience - Get article audience


// GET /api/articles/:id - Get a single article by ID
export const getArticleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // const article = await prisma.article.findUnique({
        //     where: { article_id: id },
        // })

        const article = await prisma.article.findUnique({
            where: { article_id: id },
            include: {
                type: {
                    select: { name: true }
                },
                User: {
                    select: {
                        user_id: true,
                        first_name: true,
                        last_name: true,
                        image_url: true
                    }
                }
            } as any
        });

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
    console.log('Request payload size:', JSON.stringify(req.body).length);

    try {
        const { title, content, imageUrl, audience, status, type_id, author, tags } = req.body;
        const email = req.user.decodedClaims.email;

        const authorId = await prisma.user.findUnique({
            where: { email: email },
            select: { user_id: true }
        })

        console.log('Audience; ', audience);

        const submitted = await prisma.article.create({
            data: {
                title: title,
                content: content,
                author_id: authorId?.user_id,
                imageUrl: imageUrl ? imageUrl : '',
                audience: audience,
                status: status,
                type_id: type_id,
                author: author,
                tags: tags
            } as any
        });

        // console.log('Article created:', submitted);

        res.status(201).json({ message: 'Article created successfully' });
    } catch (error) {
        console.log('Error creating article:', error);
        res.status(500).json({ message: 'Server Error: error creating article', error: error });
    } finally {
        await prisma.$disconnect();
    }
}   

// POST /api/articles/types - Create a new article type
export const createArticleType = async (req: Request, res: Response) => {
    try {
        const { typeName } = req.body;
        const newArticleType = await prisma.articleType.create({
            data: {
                name: typeName
            }
        });

        res.status(201).json({ message: 'Article type created successfully' });
    } catch(error) {
        res.status(500).json({ message: 'Server Error: error creating article type', error: error });
    } finally {
        await prisma.$disconnect();
    }
};

// PATCH /api/articles/:id - Update an article by ID. This is a partial update
export const updateArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // const { title, datePublished, content, 
        //     imageUrl, audience, status, author_id, author, type } = req.body;

        const { title, datePublished, content, imageUrl, audience, status, 
            author_id, author, type_id, tags } = req.body;

        // console.log("Audience: ", audience);
        
        const updateArticleData: any = {};

        if (title) updateArticleData.title = title;
        if (datePublished) updateArticleData.datePublished = datePublished;
        if (content) updateArticleData.content = content;
        if (imageUrl) updateArticleData.imageUrl = imageUrl;
        if (audience) updateArticleData.audience = audience;
        if (status) updateArticleData.status = status;
        if (author_id) updateArticleData.author_id = author_id;
        if (author) updateArticleData.author = author;
        if (type_id) updateArticleData.type_id = type_id;
        if (tags) updateArticleData.tags = tags;

        console.log('Article audience : ', audience);

        await prisma.article.update({
            where: { article_id: id },
            data: updateArticleData
        })

        res.status(200).json({ message: 'Article updated successfully' });
    } catch (error) {
        console.log('Error updating article:', error);
        res.status(500).json({ message: 'Server Error: error updating article', error: error });
    } finally {
        await prisma.$disconnect();
    }
};

// PUT /api/articles/:id - Update an article by ID. This is a full update
export const updateArticleWhole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // const { title, datePublished, content, 
        //     imageURL, audience, status, author_id, author, type } = req.body;

        const { title, datePublished, content, imageURL, audience, status, 
            author_id, author, type_id } = req.body;

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
                type_id: type_id
            } as any
        }); 

        res.status(200).json(updatedArticle);
        return;                
    } catch (error) {
        console.log('Error updating article:', error);
        res.status(500).json({ message: 'Server Error: error updating article', error: error });
        return;
    } finally {
        await prisma.$disconnect();
    }
};

// PATCH /api/articles/types/:typeId - Update article type by name
export const updateArticleType = async (req: Request, res: Response) => {
    try {
        const { typeId } = req.params;
        const { newTypeName } = req.body;

        if (!typeId || !newTypeName) {
            res.status(400).json({ message: 'typeId and newTypeName are required' });
            return;
        }

        const existingType = await prisma.articleType.findUnique({
            where: { name: newTypeName }
        });
        
        if(existingType) {
            res.status(409).json({ message: 'An article type with this name already exists.' });
            return;
        }

        // update article type name
        await prisma.articleType.update({
            where: { type_id: typeId },
            data: {
                name: newTypeName
            }
        });

        res.status(200).json({ message: 'Article type updated successfully' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'An unexpected error occurred while updating the article type.', error: error });
        return;

    } finally {
        await prisma.$disconnect();
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

    } finally {
        await prisma.$disconnect();
    }
};

// DELETE /api/articles/ - Delete multiple articles
export const deleteArticles = async (req: Request, res: Response) => {
    try {
        let articleIds = await req.body.articleIds;

        articleIds = Object.values(articleIds);
        // console.log("Article Ids2: ", articleIds);

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

    } finally {
        await prisma.$disconnect();
    }
};

// DELETE /api/articles/types/:typeName - Delete all articles of a specific type
export const deleteArticleType = async (req: Request, res: Response) => {
    try {
        const { typeId } = req.params;

        const articleType = await prisma.articleType.findUnique({
            where: { type_id: typeId }
        })

        if (articleType?.isDefault) {
            res.status(400).json({ message: 'Default article type cannot be deleted' });
            return;

        } else {
            const defaultTypeId = await prisma.articleType.findFirst({
                where: { isDefault: true } as any,
                select: {
                    type_id: true
                }
            });

            if(!defaultTypeId) {
                res.status(400).json({ message: 'Default article type not found' });
                return;
            }

            const updatedArticles = await prisma.article.updateMany({
                where: { type_id: typeId },
                data: {
                    type_id: defaultTypeId.type_id 
                }
            });

            await prisma.articleType.delete({
                where: { type_id: typeId }
            });

            res.status(200).json({ data: updatedArticles, message: 'Article type deleted successfully' });
        }
        return;
    } catch (error) {
        res.status(500).json({ message: 'Server Error: error deleting article type', error: error });
        return;

    } finally {
        await prisma.$disconnect();
    }
};