
import { Program, Department, Status } from "../Student/studentTypes";
import { AlumniStudy } from "../Alumni/alumniTypes";
import { Article } from "../Article/articleTypes";

export type UserRole = 'Admin' | 'Student' | 'Alumni' | 'Prospective Student' | 'All' | '';

export type User = {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
    middle_name?: string;
    image_url?: string;
    Admin?: Admin;  
    Alumni?: Alumni; 
    Student?: Student; 
    Articles: Article[];
    // Groups: Group[];
    // MessagesSent: Message[];
    // UserEvents: UserEvent[];
    // UserGroups: UserGroup[];
    // Notifications: UserNotification[];
  };
  

export type Student = {
    user_id: string;
    program_id?: string;
    department_id: string;
    status: Status;
    intake?: string;
    intake_year?: number;
    // student_type?: StudentType;
    Department: Department;
    Program?: Program;
    User: User;
  };
  
export type Alumni = {
    user_id: string;
    current_position?: string;
    company?: string;
    User: User;
    AlumniStudy: AlumniStudy[];
  };
  
export  type Admin = {
    user_id: string;
    permissions?: string;
    User: User;
  };
  