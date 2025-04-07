

export const getStudentByStatus = async ({ status }: { status: string }) => {
 
    try {
        console.log('>>>Fetching PROSPECTIVE students by status: ', status);
        // fetch students by status (Prospective)
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