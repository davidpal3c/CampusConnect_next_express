"use client";

import React, { useState, useEffect, useRef } from "react";
// import PageHeader from "@/app/components/PageHeader/PageHeader";
// import {FilterDropdown, FilterInput} from "@/app/components/Buttons/FilterButton/FilterButton";
import ArticleCard from "@/app/components/PageComponents/Admin/Articles/ArticleCard";
import ActionButton from "@/app/components/Buttons/ActionButton";
import OptionsButton from "@/app/components/Buttons/OptionsButton";
import ArticleEditor from "@/app/components/PageComponents/Admin/Articles/ArticleEditor";
import ArticlesTableDetailed from "@/app/components/PageComponents/Admin/Articles/ArticlesTableDetailed";

import { toast } from "react-toastify";

// mui 
import { Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { BsFiletypePdf } from "react-icons/bs";

export default function Articles() {

  const [articles, setArticles] = useState<any[]>([]); 
  const [originalArticles, setOriginalArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filterType, setFilterType] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(8); 
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 

  const articleEditorRef = useRef(null);

  // TODO : fetch current article types from backend and set them here
  const [articleTypes, setArticleTypes] = useState(["Campus", "General", "News", "PreArrivals"]);

  const [ isCreatePanelVisible, setIsCreatePanelVisible ] = useState(false);
  const [ panelTask, setPanelTask ] = useState("Create");

  const [ articlesView, setArticlesView ] = useState("Simple");
  const [ selectedArticle, setSelectedArticle ] = useState({}); 


  const handleSimpleView = () => {
    setArticlesView("Simple");
  };

  const handleExtendedView = () => {
    setArticlesView("Extended"); 
  };

  useEffect(() => {
    fetchArticleData();
  }, []);


  // sroll to ArticleEditor when it is visible
  useEffect(() => {
    if (isCreatePanelVisible && articleEditorRef.current) {
      articleEditorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

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
   
  const handleSort = (option: any) => {
    setSortOption(option);
    setCurrentPage(1);

    console.log("Sorting by: ", option);

    // applySort(filteredArticles, option); 
    applySort(filteredArticles.length > 0 ? filteredArticles : originalArticles, option); 
  }

  const applySort = (articlesToSort: any[], option: string) => {
    let sortedArticles = [...articlesToSort];

    switch (option) {
      case "Published ASC":
        sortedArticles.filter((article) => article.status === "Published");
        sortedArticles.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        break;
      case "Last Updated":
        sortedArticles.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        break;
      case "Date ASC":
        sortedArticles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "Date DSC":
        sortedArticles.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "Title ASC": 
        sortedArticles.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));  
        break;
      case "Title DSC":
        sortedArticles.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
        break;
      default:
        sortedArticles = [...articlesToSort];   
    }

    setArticles(sortedArticles);
    // console.log("Sorted Articles: ", sortedArticles);
  };

  const handleFilterByType = (type: string) => {
    console.log("Filtering by type: ", type);
    setCurrentPage(1);
    setFilterType(type);  

    const filtered = type ? originalArticles.filter((article) => article.type === type) : [...originalArticles];
    // if (!type) {
    //   setArticles([...originalArticles]);
    //   return;
    // }

    setFilteredArticles(filtered);
    applySort(filtered, sortOption);
  };

  useEffect(() => { 
    let filtered = [...originalArticles];

    if (filterType) {
      filtered = originalArticles.filter((article) => article.type === filterType);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        Object.values(article).some(value =>
          typeof value === "string" && value.toLowerCase().includes(lowerQuery)
        )
      );
    }

    setFilteredArticles(filtered);
    applySort(filtered, sortOption);
  }, [originalArticles, filterType, sortOption, searchQuery]);



  // re-apply filtering when original articles change
  // useEffect(() => {
  //   if (filterType) {
  //     handleFilterByType(filterType);
  //   } else {
  //     setFilteredArticles([...originalArticles]);
  //     applySort(originalArticles, sortOption);
  //   }
  // }, [originalArticles]);


  // // re-apply sorting when original articles change
  // useEffect(() => {
  //   if(sortOption) {
  //     handleSort(sortOption);
  //   };
  // }, [originalArticles]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const lowerQuery = query.toLowerCase();
    const filtered = originalArticles.filter((article) => {
      const matchesFilter = filterType ? article.type === filterType : true;
      const matchesSearch = Object.values(article).some((value) => {
        typeof value === "string" && value.toLowerCase().includes(lowerQuery);
      });

      return matchesFilter && matchesSearch;
    });

    setFilteredArticles(filtered);
    applySort(filtered, sortOption);      //maintain sorting
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

      // checking for articles with images
      // for (let i = 0; i < articleData.length; i++){ 
      //   if(articleData[i].imageUrl !== null) {
      //     console.log("Article Image: ", articleData[i].imageUrl);
      //   }
      // }

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

  const [articlesPageOptionHandlers] = useState([
    { title: "Articles Data Analytics", handler: () => console.log("Articles Data Analytics"), icon: null, },
    { title: "Export to Excel", handler: () => console.log("Export to Excel"), icon: <PiMicrosoftExcelLogoFill style={{ color: "#005795", fontSize: 20}} /> },
    { title: "Export to PDF", handler: () => console.log("Export to PDF"), icon: <BsFiletypePdf style={{ color: "#005795", fontSize: 20}} /> },
    { title: "Manage Article Types", handler: () => console.log("Manage Article Types"), icon: null },
  ]);

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
                <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1 w-32">
                  <select
                      className="flex-1 text-saitGray text-sm bg-transparent border-none focus:outline-none lg:w-20"
                      onChange={(e) => handleFilterByType(e.target.value)}
                  >
                    <option value="">Filter By Type</option>
                    {articleTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}        
                  </select>
                </div>
              
                <div className="flex flex-row w-[9.2rem] items-center bg-white border-2 rounded-lg p-1">
                  <select
                      className="flex-1 text-saitGray text-sm bg-transparent border-none focus:outline-none lg:w-20"
                      value={sortOption}
                      onChange={(e) => handleSort(e.target.value)}
                  >
                    <option value="">Sort By</option>  
                    <option value="Published ASC">Last Published</option>
                    <option value="Last Updated">Last Updated</option>
                    <option value="Date DCS">Least Recent (created)</option>
                    <option value="Date ASC">Most Recent (created)</option>   
                    <option value="Title ASC">Title (A to Z)</option> 
                    <option value="Title DSC">Title (Z to A)</option> 
                  </select>
                </div>
              </div>
            )}

            <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1 w-48">
              <input 
                  type="text" 
                  placeholder="Search"      //Name, Article ID, Author, Date Published 
                  className="flex-1 text-saitGray text-sm bg-transparent w-48 focus:outline-none p-1" 
                  onChange={(e) => handleSearch(e.target.value)}
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
              <OptionsButton icon={<MoreVertRoundedIcon />} optionHandler={articlesPageOptionHandlers} />
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
                    <button className="group absolute top-2 border right-2 z-10 shadow-md bg-saitWhite text-saitPurple p-1 rounded-full hover:scale-125 hover:bg-saitDarkPurple hover:border-saitLighterBlueOg hover:shadow-2xl active:scale-90 transition-transform transition-shadow duration-300 ease-in-out" onClick={() => handleEditArticle(article)}>
                      <Tooltip title="Edit Article">    
                        <EditRoundedIcon sx={{ fontSize: 21, color: 'inherit' }} className="group-hover:text-[#f7f7f7] transition-colors duration-300" />
                      </Tooltip>
                    </button>
                    {article.status === "Draft" ? (
                      // <div className="absolute top-[0.9rem] -rotate-45 left-0 z-10 shadow-md bg-purple-200 border px-3 py-1 relative before:absolute before:-left-2 before:top-0 before:w-2 before:h-full before:bg-purple-200 before:transform before:skew-y-45 after:absolute after:-right-2 after:top-0 after:w-2 after:h-full after:bg-purple-200 after:transform after:-skew-y-45">
                      //   <p className="text-purple-600 text-sm">Draft</p>
                      // </div>
                      <div className="absolute top-2 left-2 z-10 shadow-md bg-purple-200 border px-3 py-1 rounded-full">
                        <p className="text-purple-600 text-sm">Draft</p>
                      </div>
                    ) : (
                      <div className="absolute top-2 left-2 z-10 shadow-lg bg-blue-100 border text-blue-600 px-3 py-1 rounded-full">
                        <p className="text-blue-600 text-sm">Published</p>
                      </div>
                    )}
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
              <ActionButton title="Previous" onClick={handlePrevious} disabled={currentPage === 1} icon={<ArrowLeftRoundedIcon />} iconFirst={true} />
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <ActionButton title="Next" onClick={handleNext} disabled={currentPage === totalPages} icon={<ArrowRightRoundedIcon />}/>
            </div>
          </div>
          
        ) : (
          // Extended Article View
          <ArticlesTableDetailed articlesData={filteredArticles} reFetchArticles={fetchArticleData}/>
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
                  closeArticleEditor={handleCloseCreatePanel} articleObject={selectedArticle} reFetchArticles={fetchArticleData} />
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