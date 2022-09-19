export const LOGIN = "/api/v1/auth/login";

export const COMMODITY_GETALL = "/api/v1/commodity/getall";
export const COMMODITY_CREATE = "/api/v1/commodity/";
export const COMMODITY_GETBYID = "/api/v1/commodity/";
export const COMMODITY_UPDATE = "/api/v1/commodity/update";

export const TOOLS_GETALL = "/api/v1/tools/getall";
export const TOOLS_CREATE = "/api/v1/tools/";
export const TOOLS_GETBYID = "/api/v1/tools/";
export const TOOLS_UPDATE = "/api/v1/tools/update";
export const TOOLS_DELETE = "/api/v1/tools/delete";

export const DESIGNATION_GETALL = "/api/v1/designations/getall";
export const DESIGNATION_CREATE = "/api/v1/designations/";
export const DESIGNATION_GETBYID = "/api/v1/designations/getById/";
export const DESIGNATION_UPDATE = "/api/v1/designations/update";
export const DESIGNATION_DELETE = "/api/v1/designations/delete";

export const PERMISSION_GETALL = "/api/v1/permission/getall";
export const PERMISSION_CREATE = "/api/v1/permission/";
export const PERMISSION_GETBYID = "/api/v1/permission/getById/";
export const PERMISSION_UPDATE = "/api/v1/permission/update";

export const ROLE_GETALL = "/api/v1/roles/getall";
export const ROLE_CREATE = "/api/v1/roles/";
export const getRoleCraeteURL = (id: string) => {
  return `/api/v1/roles/${id}/permission`;
};
export const ROLE_GETBYID = "/api/v1/roles/getById/";
export const ROLE_UPDATE = "/api/v1/roles/update";
export const ROLE_DELETE = "/api/v1/roles/delete";

export const SUBSCRIBER_GETALL = "/api/v1/subscriber/getall";
export const SUBSCRIBER_CREATE = "/api/v1/subscriber/";
export const getSubscriberCommodities = (id: string) => {
  return `/api/v1/subscriber/${id}/commodity`;
};
export const getSubCommNotassociate = (id: string) => {
  return `/api/v1/subscriber/${id}/commodity/notassociate`;
};
export const getSubscriberUser = (id: string) => {
  return `/api/v1/subscriber/${id}/user`;
};
export const getSubUserNotassociate = (id: string) => {
  return `/api/v1/subscriber/${id}/user/notassociate`;
};
export const SUBSCRIBER_GETBYID = "/api/v1/subscriber/getById/";
export const SUBSCRIBER_UPDATE = "/api/v1/subscriber/update";

export const USER_GETALL = "/api/v1/user/getall";
export const USER_CREATE = "/api/v1/user";
export const getUserRole = (id: string) => {
  return `/api/v1/user/${id}/role`;
};
export const getUserRoleNotassociate = (id: string) => {
  return `/api/v1/user/${id}/role/notassociate`;
};
export const getUserProject = (id: string) => {
  return `/api/v1/user/${id}/project`;
};
export const getUserProjectNotassociate = (id: string) => {
  return `/api/v1/user/${id}/project/notassociate`;
};

export const getUserDataById = (id: string) => {
  return `/api/v1/user/getById/${id}`;
};

export const getConfigurationUserByProject = (id: string) => {
  return `/api/v1/user/get_config_user/${id}`;
};

export const SendAccessRequest = "/api/v1/user/provide_access";

export const USER_GETBYID = "/api/v1/user/getById/";
export const USER_UPDATE = "/api/v1/user/update";
export const USER_Delete = "/api/v1/user/delete";
export const USER_GET_PERMISSION = "/api/v1/user/getpermission";

export const deleteRoleByUser = (user_id: string) => {
  return `/api/v1/user/${user_id}/role/delete`;
};
export const deleteProjectByUser = (user_id: string) => {
  return `/api/v1/user/${user_id}/project/delete`;
};

export const GET_MODULE = "/api/v1/module/getall";

export const getSubscriberLookahead = (id: string) => {
  return `/api/v1/subscriber/${id}/lookahead`;
};

export const getSubLookaheadNotassociate = (id: string) => {
  return `/api/v1/subscriber/${id}/lookahead/notassociate`;
};

export const PROJECT_GETALL = "/api/v1/projects/getall";
export const PROJECT_CREATE = "/api/v1/projects/";
export const PROJECT_UPDATE = "/api/v1/projects/update";
export const PROJECT_DELETE = "/api/v1/projects/delete";
export const PROJECT_GETBYID = "/api/v1/projects/";

export const deleteToolsByProject = (id: string) => {
  return `/api/v1/projects/${id}/tools/delete`;
};

export const designationToolsURL = (id: string) => {
  return `/api/v1/projects/${id}/designations/tools`;
};

export const getDesignatiionTools = (
  projectId: string,
  designationId: string
) => {
  return `/api/v1/projects/${projectId}/designations/tools?designation_id=${designationId}`;
};

export const allDesignationToolsURL = (id: string) => {
  return `/api/v1/projects/${id}/designations/all_tools`;
};

export const getProjectTools = (id: string) => {
  return `/api/v1/projects/${id}/tools`;
};
export const getProjectToolsNotassociate = (id: string) => {
  return `/api/v1/projects/${id}/tools/notassociate`;
};

export const getProjectKtLinks = (id: string) => {
  return `/api/v1/kt_links/getall?project_id=${id}`;
};

export const deleteKTLink = "/api/v1/kt_links/delete";
export const createProjectKtLinks = `/api/v1/kt_links/`;
