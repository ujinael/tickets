import { User } from "../pages/auth/entities/users.entity"

export class JWTToken{
    id:string
    access_token:string
    currentUser:User
}