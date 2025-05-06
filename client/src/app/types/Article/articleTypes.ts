import { User } from "../User/userTypes";

export type Article = {
    article_id: string;
    title: string;
    datePublished?: string;
    content: string;
    imageUrl?: string;
    audience?: any; 
    created_at: Date;
    updated_at: Date;
    // status: ArticleStatus;
    author_id: string;
    author: string;
    type_id: string;
    tags?: string;
    User: User;
    type: ArticleType;
    // Categories: ArticleCategory[];
  };

export type ArticleType = {
    type_id: string;
    name: string;
    created_at: string; 
    updated_at: string; 
    isDefault: boolean;
}

export const allArticlesType = {
    type_id: "0",
    name: "All Articles",
    created_at: "2025-04-01T00:00:00.000Z",
    updated_at: "2025-04-01T00:00:00.000Z",
    isDefault: false
};