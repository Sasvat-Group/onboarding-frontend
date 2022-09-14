export interface ProjectFormData {
    project_code: number;
    project_name: string;
    display_name: string;
    project_details: string;
    kt_description: string;
}

export interface ProjectFormDataWithID extends ProjectFormData {
    id: number;
}