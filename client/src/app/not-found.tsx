'use client';
export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="bg-slate-800 flex justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">            
        <div className="flex flex-col justify-center items-center">
            <p className="text-slate-100 mb-4">Page Not Found</p> 
        </div>
    </div>
  );
}