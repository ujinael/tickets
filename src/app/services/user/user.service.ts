import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../../pages/auth/entities/users.entity'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user?: User;
 #token?:string
  constructor(private readonly router:Router) {
   }
   getUser(): User|undefined { 
    if(!this.user){
      try {
        const currentUserStr = localStorage.getItem('currentUser')
if(!currentUserStr){this.router.navigate(['auth'])
return
}
  this.user = JSON.parse(currentUserStr)
      } catch (error) {
        
      }


    }
    return this.user
   // возвращается user
  };
  setUser(user: User) {
    this.user = user
    localStorage.setItem('currentUser',JSON.stringify(user))
    // записывается пользователь в this.user 
  };
  logout(){
    localStorage.removeItem('currentUser')
    localStorage.removeItem('my_tickets_token')

    this.user = undefined
    this.router.navigate(['auth'])
  }
  getToken(){
    if(this.#token)
    return this.#token
    else {
      const token = localStorage.getItem('my_tickets_token')
      if(token)return token
      else return undefined
    }
  }
  setToken(token:string){
    this.#token = token
    localStorage.setItem('my_tickets_token',token)
  }
}
