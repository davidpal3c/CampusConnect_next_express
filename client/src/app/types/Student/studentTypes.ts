import { Student } from "../User/userTypes";
import { AlumniStudy } from "../Alumni/alumniTypes";

export type Status = 'Active' | 'Inactive' | 'Prospective' | '';

export type Program = {
    program_id: string;
    name: string;
    department_id: string;
    Department: Department;
    Students: Student[];
    AlumniStudies: AlumniStudy[];
};

export type Department = {
    department_id: string;
    name: string;
    contact_email: string;
    contact_phone: string;
    Programs: Program[];
    Students: Student[];
    AlumniStudies: AlumniStudy[];
};
  