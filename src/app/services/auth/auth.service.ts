import {  Injectable } from '@angular/core';
import { User } from '../../pages/auth/entities/users.entity';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user:User
usersStorage:Array<User> = []
  constructor(
    private readonly userService:UserService
  ) { }
  signIn(login:string,password:string,loylityCardNumber:string){
    try {
      const user = this.getUserBy(login)
if(user.password !== password) throw Error("Wrong password")
localStorage.setItem('cardNumber',loylityCardNumber)

this.userService.setUser(user)
this.userService.setToken(`my_token:${new Date().toISOString()}`)
    } catch (error) {
      throw Error((<Error>error).message)
    }

  }
  getUserBy(login:string):User{
    const dbUsers:User[] = JSON.parse(localStorage.getItem("users")!)
if(!dbUsers)throw Error("User dosn't exist")
const user = dbUsers.find(u=>u.login === login)
if(!user) throw Error("User dosn't exist")
return user
  }
  registerUser(user:User){
if(this.checkUserExist(user))
throw Error(`user with email: ${user.email} already exist. 
Please try another one`)   
const dbUsers:User[] = JSON.parse(localStorage.getItem("users")!)
if(dbUsers && Array.isArray(dbUsers))
this.usersStorage = JSON.parse(localStorage.getItem("users")!)
this.usersStorage.push(user)
localStorage.setItem("users",JSON.stringify(this.usersStorage))
this.userService.setUser(user)

  }
  checkUserExist(user:User):boolean{
const dbUsers:User[] = JSON.parse(localStorage.getItem("users")!)
if(!dbUsers) return false

const existingUser = dbUsers.find(u=>u.email === user.email && u.login === user.login)
if(existingUser) return true
else return false
  }
}
