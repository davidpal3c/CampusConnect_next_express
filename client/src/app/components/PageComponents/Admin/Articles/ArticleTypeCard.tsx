
import { IconButton } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"

// TODO: add prop article counts 

export default function ArticleTypeCard({ articleTypeData }: { articleTypeData: any }) {
    return (
        <div className="mt-2 grid grid-cols-3 gap-4 bg-white shadow-md border border-transparent p-2 rounded-lg w-full">
            <div className='flex flex-wrap items-center justify-start'>
                <h1 className="ml-4 text-md font-semibold truncate">{articleTypeData?.name || ""}</h1>
            </div>
            <div className='flex items-center justify-center'>
                <h1 className="text-md font-semibold">15</h1>
            </div>
            <div className='flex items-center justify-end w-full'>
                <Tooltip title="Edit Type" arrow>
                    <IconButton onClick={() => console.log("edit article type")}
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

                <Tooltip title="Delete Type" arrow>
                        <IconButton onClick={() => console.log("delete article type")}
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
            </div>
        </div>
    )
}




