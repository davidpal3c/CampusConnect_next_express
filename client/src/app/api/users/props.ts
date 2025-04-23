
// ARTICLES
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
    audience: Record<string, any>;
    status: string;
    type: ArticleTypeInterface;
}


// EVENTS
export interface EventInterface {
    event_id: string;
    name: string;
    date: string; 
    location: string;
    audience: string;
    host: string;
    contact: string;
    capacity: number;
    current_attendees: number;
}