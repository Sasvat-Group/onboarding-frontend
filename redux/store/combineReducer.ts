import { combineReducers } from "redux"
import appReducer from "../reducer/appReducer"
import rolePermissionReducer from "../reducer/rolePermissionReducer"

export default combineReducers({
    rolePermissionReducer,
    appReducer
})