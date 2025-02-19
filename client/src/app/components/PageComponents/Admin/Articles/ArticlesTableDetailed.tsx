import React, { useState, useRef } from "react";
import { formatToDateOnly } from "@/app/_utils/dateUtils";
import { useRouter } from "next/navigation";
import ArticleDeleteModal from "./ArticleDeleteModal";
import ArticleEditor from "./ArticleEditor";

import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Tooltip } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';




type Article = {
    id: string;
    title: string;
    datePublished: string;
    content: string;
    imageURL: string;
    audience: string;
    status: string;
    author_id: string;
    author: string;
    type: string;
}

type ArticleDetailedProps = {
    articlesData: Article[];
};  


const ArticlesTableDetailed: React.FC<ArticleDetailedProps> = ({ articlesData }) => {
       
    const columns = [
        { field: 'actions', headerName: 'Actions', type: 'actions', width: 150, renderCell: (params) => {  
            const articleId = params.row.article_id;
            return(
                <div className="flex items-center justify-center w-full h-full space-x-1">
                    <Tooltip title="Delete Article" arrow>
                        <IconButton onClick={() => handleDeleteModalOpen(articleId)}>
                            <DeleteIcon sx={{ fontSize: 22, color: '#666666', '&:hover': {color: '#932728'} }}/>
                        </IconButton>
                    </Tooltip>
                    <ArticleDeleteModal     
                        articleId={selectedArticleId ?? ""} 
                        openDeleteModal={openDeleteModal} 
                        handleDeleteModalClose={handleDeleteModalClose} 
                        noEditor={true}                  
                    />
                    <Tooltip title="Edit Article" arrow>
                        <IconButton onClick={() => handleEditArticle(params.row)}>
                            <EditIcon sx={{ fontSize: 22, color: '#666666', '&:hover': { color: '#5c2876' } }} />   
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View Article" arrow>
                        <IconButton onClick={() => handleViewArticle(articleId)}>
                            <VisibilityIcon sx={{ fontSize: 22, color: '#666666', '&:hover': { color: '#2b64ae' } }} />
                        </IconButton>
                    </Tooltip>
                </div>
            );
        }},
        { field: 'article_id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'datePublished', headerName: 'Date Created/Published', width: 210, renderCell: (params) => { 
            const datePublished = formatToDateOnly(params.row.datePublished);
            return <span className="font-normal text-saitBlack p-2 rounded-xl">{formatToDateOnly(datePublished)}</span>;
        }},
        { field: 'status', headerName: 'Status', width: 110, renderCell: (params) => { 
            const status = params.row.status;
            let className = "bg-saitBlack";

            if (status === "Published") {
                className = "bg-saitBlue"
                return <span className={`${className} font-normal text-saitWhite p-2 rounded-xl`}>{status}</span>;
              
            } else {
                className = "bg-saitPurple"
                return <span className={`${className} font-normal text-saitWhite p-2 rounded-xl`}>{status}</span>;             
            }
        }},
        { field: 'type', headerName: 'Type', width: 108 },
        { field: 'audience', headerName: 'Audience', width: 110 },
        { field: 'author', headerName: 'Author', width: 125 },
        { field: 'author_id', headerName: 'Author ID', width: 90, renderCell: (params) => { 
            return(
                <div className="flex items-center justify-center w-full h-full">
                    <span className="font-normal text-saitBlack p-2 rounded-xl">{params.row.author_id}</span>
                </div>
            );
        }},
        { field: 'imageURL', headerName: 'Image URL', width: 200 },
        { field: 'content', headerName: 'Content', width: 200 }
    ];

    const [ selectedArticleId, setSelectedArticleId ] = useState("");
    const router = useRouter();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    const articleEditorRef = useRef(null);
    const [ isCreatePanelVisible, setIsCreatePanelVisible ] = useState(false);
    const handleOpenCreatePanel = () => setIsCreatePanelVisible(true);
    const handleCloseCreatePanel = () => setIsCreatePanelVisible(false);  

    const [articleTypes, setArticleTypes] = useState(["Campus", "General", "News", "PreArrivals"]);
    const [selectedArticle, setSelectedArticle] = useState({});

    const handleEditArticle =  async (article: any) => {
        setSelectedArticle(article);
        handleOpenCreatePanel();
    };

    const handleDeleteModalOpen = (articleId: string) => {
        setSelectedArticleId(articleId);
        setOpenDeleteModal(true);
    }
    

    const handleViewArticle = (articleId: string) => {
        router.push(`/admin/articles/${articleId}`);
    }  
    
    return(
        <div className="w-full overflow-x-auto">  
            <div className="min-w-[900px]"> 
            {/* div className="w-full max-w-6xl mt-4 mr-4" */}
                <DataGrid
                    // rows={articles}              // filtered articles
                    rows={articlesData}
                    columns={columns}
                    getRowId={(row) => row.article_id}
                    checkboxSelection
                    autoHeight              
                />
            </div>

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
                  <ArticleEditor closeOnClick={handleCloseCreatePanel} articleTypes={articleTypes} action="Edit" 
                  closeArticleEditor={handleCloseCreatePanel} articleObject={selectedArticle}/>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
    );
}


export default ArticlesTableDetailed;