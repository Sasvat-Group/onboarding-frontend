import { ProjectFormDataWithID } from "./projects";

export interface UserFormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

export interface UserDataSchema {
    id: number,
    first_name: string;
    last_name: string;
    employee_id: number;
    email: string;
    email_confirmed: boolean;
    password: string;
    phone: string;
    phone_confirmed: boolean;
    lockout_end: any;
    lockout_enabled: boolean;
    access_failed_count: number;
    is_super_admin: boolean;
    status: number;
    last_login_date: any;
    base_location: string;
    projects: Array<any>;
    roles: Array<any>;
}

export interface UserDataSchemaWithId {
    id: number,
    first_name: string;
    last_name: string;
    employee_id: number;
    email: string;
    phone: string;
    base_location: string;
    projects: any[];
    roles: any[];
}

export interface UserFormDataWithID extends UserFormData {
    id: number;
}