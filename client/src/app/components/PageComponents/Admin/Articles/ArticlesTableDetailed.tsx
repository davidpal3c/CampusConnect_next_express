import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { formatToDateOnly } from "@/app/_utils/dateUtils";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from "next/router";


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
        { field: 'actions', headerName: 'Actions', type: 'actions', width: 120, renderCell: (params) => {  
            const articleId = params.row.article_id;
            return(
                <div className="flex items-center justify-center w-full h-full space-x-2">
                    <EditIcon />
                    <DeleteIcon />
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
    
    return(
        <div className="w-full max-w-6xl mt-4 mr-4">
            <DataGrid
                // rows={articles}              // filtered articles
                rows={articlesData}
                columns={columns}
                getRowId={(row) => row.article_id}
                checkboxSelection
            />
        </div>
    );
}


export default ArticlesTableDetailed;