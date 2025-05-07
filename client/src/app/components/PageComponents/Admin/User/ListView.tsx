// React Imports
import React, {useState} from 'react';

// Components
import UserItem from '@/app/components/PageComponents/Admin/User/UserItem';
import ActionButton from '@/app/components/Buttons/ActionButton';

// mui
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';


export default function UserListView({ users, handleEditUser }: { users: any[], handleEditUser: (user: any) => void }) {

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
            {currentUsers.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No users found</p>
                </div>
            )}
            <ul>
                {currentUsers.map((user, index) => {
                    return (
                            <UserItem userObject={user}
                                handleEditUser={handleEditUser}
                                key={index}
                            />  
                    )
                })}
           </ul>
           <div className="flex justify-between items-center m-4 py-4">
                <ActionButton title="Previous" onClick={handlePrevious} disabled={currentPage === 1} icon={<KeyboardArrowLeftRoundedIcon />} iconFirst={true}
                    borderColor="border-saitBlue" textColor="text-saitGray" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite" textSize="text-sm"
                />
                <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 rounded-full ${currentPage === i + 1 ? 'bg-saitBlue text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <ActionButton title="Next" onClick={handleNext} disabled={currentPage === totalPages} icon={<KeyboardArrowRightRoundedIcon />} 
                    borderColor="border-saitBlue" textColor="text-saitGray" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite" textSize="text-sm"
                />
            </div>
        </div>
    );
}