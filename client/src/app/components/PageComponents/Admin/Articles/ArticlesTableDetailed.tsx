import React, { useState, useRef, useEffect } from "react";
import { formatToDateTime } from "@/app/_utils/dateUtils";
import { useRouter } from "next/navigation";
import ArticleDeleteModal from "./Modals/ArticleDeleteModal";
import ArticleDeleteMultipleModal from "./Modals/ArticleDeleteMultipleModal";
import ArticleEditor from "./ArticleEditor";
import ActionButton from "@/app/components/Buttons/ActionButton";
import { deleteButton, getButtonClasses } from "@/app/assets/styles/buttonStyles";
import { toast } from "react-toastify";
// import { useAppDispatch } from "@/app/hooks";
// import { setArticles } from "@/app/slices/articlesSlice";
// import { useAppSelector } from "@/app/hooks";       

import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/Edit';
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
    reFetchArticles: any;
};  


const ArticlesTableDetailed: React.FC<ArticleDetailedProps> = ({ articlesData, reFetchArticles }) => {

    // View Article variables
    const [ selectedArticleId, setSelectedArticleId ] = useState("");
    const [ selectedArticleIds, setSelectedArticleIds ] = useState<string[]>([]);
    const router = useRouter();

    // Article Delete Modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    // Article Delete Multiple Modal
    const [openDeleteMultipleModal, setOpenDeleteMultipleModal] = useState(false);
    const handleDeleteMultipleModalClose = () => setOpenDeleteMultipleModal(false);

    // Article Editor
    const articleEditorRef = useRef(null);
    const [ isCreatePanelVisible, setIsCreatePanelVisible ] = useState(false);
    const handleOpenCreatePanel = () => setIsCreatePanelVisible(true);
    const handleCloseCreatePanel = () => setIsCreatePanelVisible(false);  

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

    // multiple row selection
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [selectedData, setSelectedData] = useState<Article[]>([]);

    const [showMultipleSelection, setShowMultipleSelection] = useState(false);

    const handleRowSelectionChange = (selectionModel: any) => {
        const selectedIds = Array.isArray(selectionModel) ? selectionModel : [];
        setSelectedRows(selectedIds);
        setShowMultipleSelection(selectedIds.length > 0);        // sets boolean 
    
        setSelectedData(articlesData.filter((row) => 
            selectedIds.includes(row.article_id))
        );
        // console.log("Selected Data: ", selectedData);
    };

    const handleMultipleDeleteModalOpen = () => {
        setSelectedArticleIds(selectedRows);
        setOpenDeleteMultipleModal(true);
    }
 
    const handleBulkDelete = async () => {
        handleMultipleDeleteModalOpen();
        setSelectedRows([]);        
        // setShowMultipleSelection(false);
    };

    const columns = [
        { field: 'actions', headerName: 'Actions', type: 'actions', width: 150, renderCell: (params) => {  
            const articleId = params.row.article_id;
            return(
                <div className="flex items-center justify-center w-full h-full space-x-1">
                    <Tooltip title="Delete Article" arrow>
                        <IconButton onClick={() => handleDeleteModalOpen(articleId)}
                            sx={{
                                color: '#666666',
                                '&:hover': {
                                  color: '#932728',                                     // Button hover color
                                  '& .MuiSvgIcon-root': {
                                color: '#932728',                                       // Icon hover color
                                  },
                                },
                              }}
                        >
                            <DeleteRoundedIcon sx={{ fontSize: 23, color: '#666666' }}/>
                        </IconButton>
                    </Tooltip>
                    <ArticleDeleteModal     
                        articleId={selectedArticleId ?? ""} 
                        openDeleteModal={openDeleteModal} 
                        handleDeleteModalClose={handleDeleteModalClose} 
                        noEditor={true}     
                        reFetchArticles={reFetchArticles}             
                    />
                    <Tooltip title="Edit Article" arrow>
                        <IconButton onClick={() => handleEditArticle(params.row)}
                            sx={{
                                color: '#666666',
                                '&:hover': {
                                  color: '#5c2876', 
                                  '& .MuiSvgIcon-root': {
                                    color: '#5c2876', 
                                  },
                                },
                              }}    
                        >
                            <EditRoundedIcon sx={{ fontSize: 23, color: '#666666' }} />   
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View Article" arrow>
                        <IconButton onClick={() => handleViewArticle(articleId)}
                            sx={{
                                color: '#666666',
                                '&:hover': {
                                  color: '#2b64ae', 
                                  '& .MuiSvgIcon-root': {
                                    color: '#2b64ae', 
                                  },
                                },
                            }}    
                        >
                            <VisibilityIcon sx={{ fontSize: 23, color: '#666666' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            );
        }},
        { field: 'article_id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 200 },
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
        { field: 'type', headerName: 'Type', width: 108, renderCell: (params) => {
            return <span>{params.row.type?.name || "Unknown"}</span>;
        }},
        { field: 'audience', headerName: 'Audience', width: 110 },
        { field: 'author', headerName: 'Author', width: 125 },
        { field: 'author_id', headerName: 'Author ID', width: 90, renderCell: (params) => { 
            return(
                <div className="flex items-center justify-center w-full h-full">
                    <span className="font-normal text-saitBlack p-2 rounded-xl">{params.row.author_id}</span>
                </div>
            );
        }},
        { field: 'created_at', headerName: 'Date Created', width: 210, renderCell: (params) => { 
            return <span className="font-normal text-saitBlack p-2 rounded-xl">{formatToDateTime(params.row.created_at)}</span>;
        }},
        { field: 'updated_at', headerName: 'Date Updated', width: 210, renderCell: (params) => { 
            return <span className="font-normal text-saitBlack p-2 rounded-xl">{formatToDateTime(params.row.updated_at)}</span>;
        }},
        { field: 'datePublished', headerName: 'Date Published', width: 210, renderCell: (params) => { 
            if(params.row.status === "Draft") {
                return <span className="font-normal text-saitLightPurple p-2 rounded-xl">Not Published</span>;
            } else {    
            return <span className="font-normal text-saitBlack p-2 rounded-xl">{formatToDateTime(params.row.datePublished)}</span>;
            }
        }},
        { field: 'imageUrl', headerName: 'Image URL', width: 200, renderCell: (params) => {
                return <a href={params.row.imageUrl} target="_blank" className="font-normal text-saitBlack p-2 rounded-xl">{params.row.imageUrl}</a>;
            }
        },
        { field: 'tags', headerName: 'Tags', width: 200 },
        { field: 'content', headerName: 'Content', width: 200 }
    ];

    useEffect(() => {
        // Fix scrollbars: this function adds the inert attribute to the scrollbars containing the data grid.
        // It prevents the scrollbars from being focused when the user interacts with the data grid. 
        // This is a temporary fix until the issue is resolved in the mui-datagrid library.
        // the issue with the aria-hidden attribute on the scrollbar is that it hides the scrollbar 
        // from screen readers and keyboard users, creating accessibility issues.

        const fixScrollbars = () => {
          document
            .querySelectorAll(".MuiDataGrid-scrollbar")
            .forEach((el) => el.setAttribute("inert", ""));
        };
      
        fixScrollbars();
      }, []);
       

    return (
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
                    onRowSelectionModelChange={handleRowSelectionChange}           
                />
            </div>

            {/* Bulk selection button */}
            {showMultipleSelection && (
            <div className="flex justify-end items-center mt-4">
                {/* <button className={getButtonClasses(deleteButton)} onClick={handleBulkDelete}
                    >Delete Selected
                </button> */}
                <ActionButton title="Delete Selected" textColor="text-saitDarkRed" hoverBgColor="bg-saitDarkRed" bgColor="bg-saitWhite"
                    borderColor="border-saitDarkRed" hoverTextColor="text-saitWhite" hoverBorderColor="border-saitGray"
                    onClick={handleBulkDelete}
                    icon={<DeleteRoundedIcon/>}
                />
            </div>
            )}

            <ArticleDeleteMultipleModal     
                articlesData={selectedData}
                articleIds={selectedArticleIds}
                openDeleteModal={openDeleteMultipleModal} 
                handleDeleteModalClose={handleDeleteMultipleModalClose} 
                noEditor={true}  
                reFetchArticles={reFetchArticles}                
            />

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
                    <ArticleEditor closeOnClick={handleCloseCreatePanel} action="Edit" 
                    closeArticleEditor={handleCloseCreatePanel} articleObject={selectedArticle}/>
                    </div>
                </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}

export default ArticlesTableDetailed;
