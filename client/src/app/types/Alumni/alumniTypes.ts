import { Alumni } from "../User/userTypes";
import { Program, Department } from "../Student/studentTypes";

export type AlumniStudy = {
    id: string;
    alumni_id: string;
    program_id?: string;
    department_id: string;
    graduation_year?: number;
    Alumni: Alumni;
    Program?: Program;
    Department: Department;
};