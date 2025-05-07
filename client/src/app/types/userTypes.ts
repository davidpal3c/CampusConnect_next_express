
export type UserRole = 'Admin' | 'Student' | 'Alumni' | 'Prospective Student' | 'All' | '';



export type UserData = {
    user_id: string;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    email: string;
    role: UserRole;
    image_url?: string | null;
    phone_number?: string | null;
    intake_year?: number | null;
    intake_season?: string | null;
    status?: string | null;
    created_at?: Date | null;
}