"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { fetchArticleById } from "../articles";
import ArticlesLayout from "../ArticlesLayout";
import { ArticleInterface } from "../../props";
import { useArticlesContext} from "@/app/_utils/articles-context";
import { useUserData } from "@/app/_utils/userData-context";
import { toast } from "react-toastify";

import Loader from "@/app/components/Loader/Loader";
import PrintIcon from '@mui/icons-material/Print';
import DOMPurify from "dompurify";


const ArticleContent = () => {
    // Get the article ID from the URL
    const { id } = useParams();

<<<<<<< HEAD
    // Context
    const { allArticles, articleTypes } = useArticlesContext();
    const { userData } = useUserData();
    const { Program: { Department: { department_id: departmentId, name: departmentName } = {} } = {} } = userData?.user || {};
    

    // State Management
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
=======
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
>>>>>>> dev

    useEffect(() => {
        if (id) {
            fetchArticleData(id);
        }
    }, [id]);

    const fetchArticleData = async (articleId: string) => {
        try {
            const data = await fetchArticleById(articleId);
            setArticle(data);
        } catch (error) {
            toast.error("Error fetching article data");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader isLoading={isLoading} />;
    }

    if (!article) {
        return <p className="py-6 px-16 text-red-500">Article not found.</p>;
    }

    // Destructuring after data is confirmed
    const { title, author, content, imageUrl, datePublished, type: { name: typeName }, article_id, User: { first_name, last_name, image_url }, audience: {departments: departments} } = article;

    // Sanitize content
    const ContentRenderer = ( content: string ) => {
        const cleanHTML = DOMPurify.sanitize(content);
        return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
      };

    return (
        <main className="flex flex-col lg:flex-row justify-center py-12 px-6 lg:px-24 bg-gray-50 min-h-screen">
            <div className="flex flex-col w-full max-w-4xl">
                {/* Header */}
                <header className="flex flex-col w-full text-saitBlack pb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 pb-4">{title}</h1>
                    
                    <div className="flex items-center text-gray-500">
                        <p className="text-sm">
                            {new Date(datePublished).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    <div className="flex items-center mt-4">
                        <img src={image_url || "/img_placeholder.png"} alt="Author" 
                            className="w-10 h-10 rounded-full shadow-md border border-gray-300" />
                        <p className="text-sm font-semibold pl-3 text-gray-800">{first_name} {last_name}</p>
                    </div>
                </header>

                {/* Content */}
                <div className="flex flex-col justify-center">
                    <img src={imageUrl || "/img_placeholder.png"} 
                        alt={title} 
                        className="w-full max-w-full max-h-[500px] object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105" />
                    
                    <div className="mt-6 text-gray-700 leading-7">
                        {ContentRenderer(content)}
                    </div>
                </div>
            </div>

            {/* Other Articles Sidebar */}
            <aside className="flex flex-col lg:ml-12 mt-12 lg:mt-0">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Related Articles</h2>

                    <div className="flex flex-col mt-4">
                        {allArticles
                            .filter((a: ArticleInterface) => a.article_id !== article_id && a.type.name === typeName)
                            .map((a: ArticleInterface) => (
                                <Link key={a.article_id} href={`/user/articles/${a.article_id}`} passHref 
                                    className="flex flex-col mb-4 p-4 rounded-lg hover:bg-gray-100 transition duration-200 cursor-pointer">
                                    
                                    <p className="text-lg font-semibold text-gray-900">{a.title}</p>
                                    <p className="text-sm text-gray-500 mt-1">Author: {a.author}</p>
                                </Link>
                            ))}
                    </div>

                    {/* Articles for {DEPARTMENT}*/}
                    <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mt-6">Articles Tailored to Your School</h2>

                    <div className="flex flex-col mt-4">
                        {allArticles
                            .filter((a: ArticleInterface) => 
                                a.article_id !== article_id && 
                                Array.isArray(a.audience.departments) && // Check if it's an array
                                a.audience.departments.some(department => department.department_id === departmentId)
                            )
                            .map((a: ArticleInterface) => (
                            <Link 
                                key={a.article_id} 
                                href={`/user/articles/${a.article_id}`} 
                                passHref 
                                className="flex flex-col mb-4 p-4 rounded-lg hover:bg-gray-100 transition duration-200 cursor-pointer"
                            >
                                <p className="text-lg font-semibold text-gray-900">{a.title}</p>
                                <p className="text-sm text-gray-500 mt-1">Author: {a.author}</p>
                            </Link>
                            ))
                        }
                    </div>
                </div>
            </aside>
        </main>

    );
};

const ArticleContentPage = () => (
    <ArticlesLayout>
      <ArticleContent />
    </ArticlesLayout>
);
  
export default ArticleContentPage;
