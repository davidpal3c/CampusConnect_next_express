"use client";

import React, { Suspense } from "react";
import ArticlesContent from "@/app/components/PageComponents/User/Articles/ArticlesContent";


export default function Articles() {
  
  return (
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><h1 className="text-lg font-bold">Loading...</h1></div>}>
        <ArticlesContent />
      </Suspense>
  );
}
