export interface ModulePermissionData {
    module_id : number,
    permission_id:number
}

export interface ModulePermissionDataWithID extends ModulePermissionData {
    id: number
}