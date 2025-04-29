

// GET - fetch programs and departments data
export const getProgramsAndDepartmentsData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/academic/options`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            const errorData = data;
            console.error(errorData);
            return { error: errorData || "An Error occurred fetching programs/departments data." };
        }

        return data;

    } catch (error) {
        console.error('Unknown error occurred fetching programs/departments data!', error);
        return error;
    }
}