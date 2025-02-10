import EditIcon from '@mui/icons-material/Edit';

import Link from 'next/link';

interface UserItemProps {
    user_id: string;
    name: string;
    role: string;
    email: string;
    created_at: string;
}

export default function UserItem({ user_id, name, role, email, created_at}: UserItemProps) {

    // Convert created_at to a Date object
    const createdAtDate = new Date(created_at);

    // Color condition for user's role
    const roleClass =
        role.toLowerCase() === "admin"
            ? "text-saitRed font-semibold" // Red for Admin
            : "text-saitLightBlue font-semibold"; // Blue for Student (alumni, upcoming student, current student)

    return (
        <Link href={`users/${user_id}`} passHref> 
            <div className="flex items-center justify-between bg-white shadow-md rounded-md p-4 m-4 border-2 hover:border-saitLighterBlue transition-colors duration-300">
                <div>
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className={`text-sm capitalize ${roleClass}`}>{role}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm">{email}</p>
                    <p className="text-sm">{createdAtDate.toLocaleDateString()}</p>
                </div>
            </div>
        </Link>

    );
}