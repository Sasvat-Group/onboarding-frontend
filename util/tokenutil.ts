import jwt_decode from "jwt-decode"
import { TokenData } from "../type/token"

export const isTokenExpired = (token: string) => {
    const decoded: TokenData = decodeToken(token)
    const timeSeconds = Date.now() / 1000   
    return decoded.exp <= timeSeconds
}

export const decodeToken = (token: string): TokenData => {
    return jwt_decode(token)
}

export const isSuperAdmin = (token: string) => {
    const decoded: TokenData = decodeToken(token)
    return decoded.is_super_admin
}