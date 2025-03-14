export interface ArticleTypeInterface {
    type_id: string;
    name: string;
    created_at: string; 
    updated_at: string; 
    isDefault: boolean;
}

export interface ArticleInterface {
    article_id: string;
    title: string;
    content: string;
    type_id: string;
    imageUrl: string;
    datePublished: string; 
    created_at: string;
    updated_at: string;
    author: string;
    author_id: string;
    audience: string;
    status: string;
    type: ArticleTypeInterface;
  }