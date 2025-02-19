"use client";

import React, { useState, useEffect, useRef } from "react";
// import PageHeader from "@/app/components/PageHeader/PageHeader";
// import {FilterDropdown, FilterInput} from "@/app/components/Buttons/FilterButton/FilterButton";
import ArticleCard from "@/app/components/PageComponents/Admin/Articles/ArticleCard";
import ActionButton from "@/app/components/Buttons/ActionButton";
import ArticleOptionsBtn from "@/app/components/Buttons/ArticleOptionsBtn";
import ArticleEditor from "@/app/components/PageComponents/Admin/Articles/ArticleEditor";
import ArticlesTableDetailed from "@/app/components/PageComponents/Admin/Articles/ArticlesTableDetailed";

import { toast } from "react-toastify";

// mui 
import { Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';


//icons
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';



export default function Articles() {

  const [articles, setArticles] = useState([]); 
  const [originalArticles, setOriginalArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(8); 

  const articleEditorRef = useRef(null);

  // TODO : fetch current article types from backend and set them here
  const [articleTypes, setArticleTypes] = useState(["Campus", "General", "News", "PreArrivals"]);

  const [ isCreatePanelVisible, setIsCreatePanelVisible ] = useState(false);
  const [ panelTask, setPanelTask ] = useState("Create");

  const [ articlesView, setArticlesView ] = useState("Simple");
  const [ selectedArticle, setSelectedArticle ] = useState({}); 

  const [searchValue, setSearchValue] = useState([]); 

  const handleSimpleView = () => {
    setArticlesView("Simple");
  };

  const handleExtendedView = () => {
    setArticlesView("Extended"); 
  };

  useEffect(() => {
    fetchArticleData();
  }, [originalArticles]);

  useEffect(() => {
    if (isCreatePanelVisible && articleEditorRef.current) {
      const scrollPosition = articleEditorRef.current.offsetTop - 1000;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    }
  }, [isCreatePanelVisible]);


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
      setOriginalArticles(articleData);

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

  const handleEditArticle =  async (article: any) => {
    setPanelTask("Edit");
    setSelectedArticle(article);
    handleOpenCreatePanel();
  };


  return(
    <main className="bg-saitWhite h-screen p-4 xl:pr-8">
      <div className="">
        <header className="flex flex-col items-center justify-between border-b-2 border-saitBlack pb-3 lg:flex-row md:space-y-3 xs:space-y-3">
          <h1 className="text-2xl font-bold">Articles</h1>
          
          <div className="flex flex-col sm:flex-row md:space-x-2 sm:space-x-2">
            <div className="flex flex-row w-[4.3rem] items-center justify-evenly bg-white border-2 rounded-lg p-1">
              <Tooltip title="Simple View">
                <button className="" onClick={handleSimpleView}>
                  <ViewModuleRoundedIcon sx={
                    articlesView === "Simple" ? { color: '#2b64ae', fontSize: 26 } :
                    { color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' }}
                    }/>
                </button>
              </Tooltip>
              <Tooltip title="Extended View">
                <button className="" onClick={handleExtendedView}>
                  <ViewListRoundedIcon sx={
                    articlesView === "Extended" ? { color: '#2b64ae', fontSize: 26 } :
                    { color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' }}
                    }/>
                </button>
              </Tooltip>
            </div>

            {articlesView === "Simple" && (
              <div className="flex flex-row space-x-2">
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
              
                <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1">
                  <select
                      className="flex-1 text-saitGray text-sm bg-transparent border-none focus:outline-none lg:w-20"
                  >
                    <option value="">Sort By</option>  
                    <option value="Author">Author</option>   
                    <option value="Date">Date</option>
                    <option value="Title">Title</option> 
                    <option value="Date">Type</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1">
              <input 
                  type="text" 
                  placeholder="Search"      //Name, Article ID, Author, Date Published 
                  className="flex-1 text-saitGray text-sm bg-transparent w-64 focus:outline-none p-1" 
              />
              <SearchOutlinedIcon className="text-saitGray" fontSize="small" />
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row xs:space-x-3 md:space-x-2 sm:space-x-6">
            <Tooltip title="New Article">
              <div>              
                <ActionButton title="Create" icon={<AddRoundedIcon />} 
                  onClick={handleCreateArticle} borderColor="border-saitBlue" textColor="text-saitGray" 
                  hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"
                />
              </div>
            </Tooltip>
            <div>
              <ArticleOptionsBtn icon={<MoreVertRoundedIcon />} />
            </div>
          </div>
        </header>


                
        {articlesView === "Simple" ? (
          //* Simplified Article View */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {currentArticles.length > 0 ? (
                currentArticles.map((article) => (
                  <div key={article.article_id} className="relative flex flex-col bg-white rounded-xl shadow-md border border-transparent hover:border-saitLighterBlueOg hover:shadow-blue-100 hover:shadow-lg hover:scale-105 transition-transform transition-shadow duration-300 ease-in-out">
                    <button className="absolute top-2 border right-2 z-10 shadow-md bg-saitWhite text-saitPurple p-1 rounded-full hover:scale-125 hover:border-saitLighterBlueOg hover:shadow-2xl active:scale-90 transition-transform transition-shadow duration-300 ease-in-out" onClick={() => handleEditArticle(article)}>
                      <Tooltip title="Edit Article">    
                        <EditRoundedIcon sx={{ fontSize: 21 }} />
                      </Tooltip>
                    </button>
                    <button>
                      <ArticleCard article={article} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-black">Loading.....</p>
              )}
            </div>
            
             {/* pagination */}
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

          </div>
          
        ) : (
          // Extended Article View
          <ArticlesTableDetailed articlesData={originalArticles}/>
        )}

          {/* Create Article Panel */}
          <AnimatePresence>
            {isCreatePanelVisible &&
              <motion.div
                ref={articleEditorRef}
                initial={{ x: "100vh" }}
                animate={{ x: 0 }}                                                        //final state of animation
                exit={{ x: "100vh" }}                                                      // exit animation
                transition={{ duration: 0.7, ease: "easeInOut" }}
                // transition={{ type: "easing", stiffness: 150, damping: 40 }}
                className="absolute top-0 right-0 h-full w-full rounded-lg bg-saitWhite shadow-xl p-6 z-50"
              >
                <div className="">
                  <ArticleEditor closeOnClick={handleCloseCreatePanel} articleTypes={articleTypes} action={panelTask} 
                  closeArticleEditor={handleCloseCreatePanel} articleObject={selectedArticle}/>
                </div>
              </motion.div>
            }
          </AnimatePresence>


        <div className="mt-6">
          <p className="text-black">Total Articles: {articles.length}</p>
        </div>
      </div>
    </main>
  );

}