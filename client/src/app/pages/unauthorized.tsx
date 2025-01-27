
"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UnauthorizedPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Access Denied');

  useEffect(() => {
    const queryMessage = router.query.message as string;
    if (queryMessage) {
      setMessage(decodeURIComponent(queryMessage));
    }
  }, [router.query]);

//   return (   

//     // <div className="p-8 bg-white shadow-md rounded-lg text-center">
//     // <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h1>
//     // <p className="text-gray-700 mb-6">{message}</p>
//     // <div className="flex justify-center space-x-4">
//     // <button 
//     //     onClick={() => router.push('/admin/login')}
//     //     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//     // >
//     //     Login
//     // </button>
//     // <button 
//     //     onClick={() => router.push('/')}
//     //     className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//     // >
//     //     Home
//     // </button>
//     // </div>
//     // </div>
//   );
}