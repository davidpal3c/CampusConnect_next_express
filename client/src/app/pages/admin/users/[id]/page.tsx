"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function UserDetails() {

    // State to hold user data
    const [user, setUser] = useState({});

    useEffect(() => {
            fetchData();
        }, []);

    // Extracting user ID from users/:id
    const params = useParams();
    const id = params?.id;

    
    // Fetch user data from the API
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`);
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>User Profile for ID: {user.first_name}</h1>
        </div>
    );
}
