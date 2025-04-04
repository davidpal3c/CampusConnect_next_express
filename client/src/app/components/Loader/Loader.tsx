import React, { use, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { set } from 'react-hook-form';

interface LoaderProps {
    isLoading: boolean;
}

export default function Loader({isLoading}: LoaderProps) {

    const [open, setOpen] = useState(isLoading);

    // const handleClose = () => {
    //     setOpen(false);
    // };

    useEffect(() => {
        setOpen(isLoading);
    }, [isLoading]);

    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
      </div>
    );
};



// import CircularProgress from '@mui/material/CircularProgress';

// interface LoaderProps {
//     isLoading: boolean;
// }

// export default function Loader({isLoading}: LoaderProps) {
//     return (
//         <div className="opacity-80 flex justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">            
//             <div className="flex flex-col justify-center items-center">
//                 <p className="text-saitBlack font-semibold text-2xl">Loading...</p>
//                 <CircularProgress sx={{ color: "black"}}/>               
//             </div>
//         </div>
//     );
// };
