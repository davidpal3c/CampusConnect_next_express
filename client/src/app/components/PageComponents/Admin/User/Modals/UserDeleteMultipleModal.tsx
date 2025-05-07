import React, { useState, useEffect } from 'react';    
import ActionButton from "@/app/components/Buttons/ActionButton";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from "react-toastify";
import { deleteUsersByIds } from "@/app/api/admin/users";


type UserDeleteMultipleModalProps = {
    usersData: any[];                                           // Array of user data objects
    userIds: string[];                                          // Array of user IDs to be deleted
    noEditor?: boolean;                                         // Optional prop to determine if the editor should be closed
    openDeleteModal: boolean;                                   // State to control the modal visibility
    handleDeleteModalClose: () => void;                         // Function to close the modal
    closeUserEditor?: () => void;                                // Function to close the article editor
    reFetchUsers: () => void;                                   // Function to re-fetch users after deletion
}
    

export default function UserDeleteMultipleModal({ usersData, userIds, noEditor, openDeleteModal, handleDeleteModalClose, closeUserEditor, reFetchUsers }: UserDeleteMultipleModalProps) {

    
    const processDeleteUser = async (userIds: string[]) => {
        try {
            if (userIds.length === 0 || userIds === undefined) {
                toast.error('No users selected for deletion!');
                return;
            }

            const response = await deleteUsersByIds(userIds);
            
            if (response.error) {
                toast.error(response.error || 'An error occurred deleting user(s).');
                console.log('Error deleting user(s): ', response.error);
                return;
            }

            await reFetchUsers();  
            toast.success(response.message || `User(s) deleted successfully!`);

        } catch (error) {
            console.log('Error deleting user(s): ', error); 
            toast.error(`Unknown error occurred deleting user(s)! : ` + error);
            return;
        }
    };    

    const submitDelete = async () => {
        await processDeleteUser(userIds);
        handleDeleteModalClose();

        if(noEditor) return;            // only close editor if noEditor is false (using component with editor)
        // closeArticleEditor();
    };
    
    // useEffect(() => {
    //     console.log('selected rows: ', usersData);
    //     console.log('selected rows IDs: ', userIds);
    // }, [userIds, usersData]);

    return(
        <Modal 
            open={openDeleteModal} 
            onClose={handleDeleteModalClose} 
            aria-labelledby="delete-article-modal" 
            aria-describedby="delete-article-modal-description"
            id="delete-article-modal"
            BackdropProps={{
                sx: { backgroundColor: noEditor ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.5)" }  
            }}
        >
            <Box sx={modalStyle}>
                <div className="flex flex-col items-center justify-center p-4 my-2">    
                    <p className="text-center">Are you sure you want to delete {userIds.length > 1 ? ('these users?') : ('this user?')}</p>
                    <div className="flex flex-col items-center justify-center w-full mt-4">
                        {userIds.length > 1 ? <p className="text-center font-semibold italic text-sm mb-2">You are about to delete <span className='text-lg text-red-500'>{userIds.length}</span> users.</p> : null}    
                        {usersData.map((data, index) => {
                            return (
                                <p key={index} className="text-center italic text-sm text-color-500">
                                    {`User: ${data.first_name} ${data.last_name} - ID: ${data.user_id}`}
                                </p>
                            );
                        })}
                    </div>
                    <p className="text-center italic text-sm text-red-600 mt-2">( This operation can't be undone!! )</p>            
                    <div className="flex items-center justify-center w-full space-x-5 mt-4">
                    <ActionButton title="Delete" onClick={submitDelete}
                                textColor="text-saitRed" borderColor="border-saitRed" hoverBgColor="bg-saitDarkRed" hoverTextColor="text-saitWhite"/>                            
                    <ActionButton title="Cancel" onClick={handleDeleteModalClose}
                                textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"/>                                                          
                    </div>
                </div>
            </Box>   
        </Modal>    
    );
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',    // default value set by theme in the Modal component
    border: '1px solid #000',
    borderRadius: 4,
    boxShadow: 2,
    backgroundColor: "#f7f7f7",
  };