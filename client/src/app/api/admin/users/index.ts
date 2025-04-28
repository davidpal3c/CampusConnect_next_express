
export const getUsersData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",  
        });

        const data = await response.json();

        if (!response.ok) {
            const errorData = data;
            console.error(errorData);
            return { error: errorData || "An Error occurred fetching users." };
        }

        return data;

    } catch (error) {
        console.error('Unknown error occurred fetching users!', error);
        return error;
    }
};


export const getStudentsByStatus = async ({ status }: { status: string }) => {
 
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/students/${status}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
        });
    
        const data = await response.json();

        if (!response.ok) {
            const errorData = data.error
            return { error: errorData || "An Error occurred fetching students." };
        }
        
        return data;    

    } catch (error) {
        console.error('Error fetching students by status:', error);
        return error;
    }
    
}

export const deleteUsersByIds = async (userIds: string[]) => {
    try {

        // const intUserIds = userIds.map(Number);
        // console.log('>>>Deleting students by IDs: ', intUserIds);
        // const intUserIds = userIds.map((id) => parseInt(id, 10));

        // fetch students by status (Prospective)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ userIds }),
        });
    
        const data = await response.json();
        console.log('>>>Deleting students by IDs: ', data);  

        if (!response.ok) {
            const errorData = data.error
            return { error: errorData || "An Error occurred deleting users." };
        }
        
        return data;    

    } catch (error) {
        console.error('Error deleting users:', error);
        return error;
    }
};


// post - create user