"use client";

import React, { useState, useEffect, use } from "react";
// import PageHeader from "@/app/components/PageHeader/PageHeader";
// import {FilterDropdown, FilterInput} from "@/app/components/Buttons/FilterButton/FilterButton";
import ArticleCard from "@/app/components/Page components/Articles/ArticleCard";
import ActionButton from "@/app/components/Buttons/ActionButton";
import ArticleOptionsBtn from "@/app/components/Buttons/ArticleOptionsBtn";
import ArticleEditor from "@/app/components/Page components/Articles/ArticleEditor";

import { toast } from "react-toastify";

// mui 
import { Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';


//icons
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';



export default function Articles() {

  const [articles, setArticles] = useState([]); 
  const [originalArticles, setOriginalArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(8); 

  const [searchValue, setSearchValue] = useState([]); 

  //TODO: fetch current article types from backend
  const [articleTypes, setArticleTypes] = useState(["All", "Campus", "General", "News", "Pre-Arrivals"]);

  const [ isCratePanelVisible, setIsCreatePanelVisible ] = useState(false);
  const [ panelTask, setPanelTask ] = useState("Create");

  useEffect(() => {
    fetchArticleData();
  }, [articles]);

  useEffect(() => {
    if (articles.length == 0) {
      console.log("No articles found");
    }
  }, [])


   // Pagination
   const indexOfLastArticle = currentPage * articlesPerPage;
   const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
   const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

   const totalPages = Math.ceil(articles.length / articlesPerPage);
  
   const handlePrevious = () => {
       if (currentPage > 1) setCurrentPage((prev) => prev - 1);
   };

   const handleNext = () => {
       if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
   };
   


  const fetchArticleData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",   
      });

      const articleData = await response.json();

      if (!response.ok) {
        const errorData = articleData;
        toast.error(errorData.message || "An Error occurred fetching articles.");
        return;
      } 

      setArticles(articleData);

    } catch (error) {
      console.error(error);
      toast.error("Unknown error occurred fetching articles! : " + error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  const handleOpenCreatePanel = () => setIsCreatePanelVisible(true);
  const handleCloseCreatePanel = () => setIsCreatePanelVisible(false);  
  
  const handleCreateArticle = () => {
    setPanelTask("Create");
    handleOpenCreatePanel();
  };

  const handleEditArticle = () => {
    setPanelTask("Edit");
    handleOpenCreatePanel();
  };


  return(
    <main className="bg-saitWhite h-screen p-4">
      <div className="">
        <header className="flex flex-col items-center justify-between border-b-2 border-saitBlack pb-3 lg:flex-row md:space-y-3 xs:space-y-3">
          <h1 className="text-2xl font-bold">Articles</h1>
          
          <div className="flex flex-col sm:flex-row md:space-x-2 sm:space-x-2">
            <div className="flex flex-row w-[4.3rem] items-center justify-evenly bg-white border-2 rounded-lg p-1">
              <Tooltip title="Simple View">
                <button className="">
                  <ViewModuleRoundedIcon sx={{ color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' }}}/>
                </button>
              </Tooltip>
              <Tooltip title="Extended View">
                <button className="">
                  <ViewListRoundedIcon sx={{ color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' } }}/>
                </button>
              </Tooltip>
            </div>

            <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1">
              <select
                  className="flex-1 text-saitGray text-sm bg-transparent border-none focus:outline-none lg:w-20"
              >
                <option value="">Filter By</option>
                {articleTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}        
              </select>
            </div>
            <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1 ">
              <input 
                  type="text" 
                  placeholder="Name, Article ID, Author, Date Published" 
                  className="flex-1 text-saitGray text-sm bg-transparent w-64 focus:outline-none p-1" 
              />
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row xs:space-x-3 md:space-x-2 sm:space-x-6">
            <Tooltip title="New Article">
              <div>              
                <ActionButton title="Create" onClick={handleCreateArticle} borderColor="border-saitBlue"
                  textColor="text-saitGray" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"
                />
              </div>
            </Tooltip>
            <div>
              <ArticleOptionsBtn icon={<MoreVertRoundedIcon />}
                borderColor="border-saitPurple" textColor="text-saitGray" hoverTextColor="text-saitWhite" borderColor="border-saitGray"
              />
            </div>
          </div>
        </header>

        {/* Simplified Article View */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {currentArticles.length > 0 ? (
              currentArticles.map((article, index) => (
                <button key={index} className="bg-white rounded-xl shadow-md border border-transparent hover:border-blue-200 hover:shadow-blue-100 hover:shadow-lg hover:scale-105 transition-transform transition-shadow duration-300 ease-in-out">
                  <ArticleCard article={article} />
                </button>
              ))
            ) : (
              <p className="text-black">Loading.....</p>
            )}
        </div>
        {/* Pagination */}

        {/* Create Article Panel */}
        <AnimatePresence>
          {isCratePanelVisible &&
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}                                                        //final state of animation
              exit={{ x: "100%" }}                                                      // exit animation
              transition={{ duration: 0.7, ease: "easeInOut" }}
              // transition={{ type: "easing", stiffness: 150, damping: 40 }}
              className="absolute top-0 right-0 h-full w-full rounded-lg bg-saitWhite shadow-xl p-6 z-50"
            >
              <div className="">
                <ArticleEditor closeOnClick={handleCloseCreatePanel} articleTypes={articleTypes} action={panelTask} closeArticleEditor={handleCloseCreatePanel}/>
              </div>
            </motion.div>
          }
        </AnimatePresence>


        {/* Extended View */}

        <div className="flex justify-between items-center mt-4 border-t-saitBlack pt-4">
          <button 
              onClick={handlePrevious} 
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
              Previous
          </button>
          <span>
              Page {currentPage} of {totalPages}
          </span>
          <button 
              onClick={handleNext} 
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
              Next
          </button>
        </div>
        <div className="mt-6">
          <p className="text-black">Total Articles: {articles.length}</p>
        </div>
      </div>
    </main>
  );

}