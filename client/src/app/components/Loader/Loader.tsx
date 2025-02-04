import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
    isLoading: boolean;
}

export default function Loader({isLoading}: LoaderProps) {
    return (
        <div className="opacity-50 flex justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">            
            <div className="flex flex-col justify-center items-center">
                <p className="text-saitBlack font-semibold text-2xl">Loading...</p>
                <CircularProgress sx={{ color: "black"}}/>               
            </div>
        </div>
    );
}