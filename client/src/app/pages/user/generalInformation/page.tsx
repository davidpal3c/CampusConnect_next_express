"use client";

import React, { useState, useEffect } from "react";
import UserPageHeader from "@/app/components/PageHeader/PageHeader";
import ArticleList from "@/app/components/PageComponents/User/Articles/ArticleList";
import { fetchArticles } from "../articles/articles";

export default function GeneralInformation() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const data = await fetchArticles("General");
      if (data) {
        setArticles(data);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="bg-saitWhite h-screen">
      <UserPageHeader title="General Information" />
      <ArticleList articles={articles} />
    </div>
  );
}
