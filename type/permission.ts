export interface PermissionFormData {
    code: string
    display_name: string;
}
  
export interface PermissionDataWithID extends PermissionFormData {
    id: number;
}

export enum Permissions {
    VIEW = "read",
    ADD = "add",
    EDIT = "edit",
    DELETE = "delete",
    EXPORT = "export"
}