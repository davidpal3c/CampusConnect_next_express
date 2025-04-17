// React Imports
import React, {useState} from 'react';

// Components
import UserItem from '@/app/components/PageComponents/Admin/User/UserItem';


export default function UserListView({ users }: { users: any[] }) {

    // State Management
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); 

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div>
            <ul>
                {currentUsers.map((user, index) => {
                    return (
                            <UserItem 
                                key={user.user_id}
                                user_id={user.user_id}
                                name={`${user.first_name} ${user.last_name}`}
                                role={user.role}
                                email={user.email}
                                created_at={user.created_at}
                            />  
                    )
                })}
           </ul>
           <div className="flex justify-between items-center m-4 py-8">
              <button 
                  onClick={handlePrevious} 
                   disabled={currentPage === 1}
                     className="px-4 py-2 bg-gray-200 shadow-md rounded-md disabled:opacity-50"
                                    >
                     Previous
                 </button>
                 <span>
                     Page {currentPage} of {totalPages}
                   </span>
                <button 
                    onClick={handleNext} 
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 shadow-md rounded-md disabled:opacity-50"
                >
                     Next
                </button>
            </div>
        </div>
    );
}