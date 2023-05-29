import { Injectable } from '@angular/core';
import { User } from '../../pages/auth/entities/users.entity';

import { UserService } from '../user/user.service';
import { RestService } from '../rest/rest.service';
import { concatMap, firstValueFrom, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  usersStorage: Array<User> = [];
  constructor(
    private readonly userService: UserService,
    private readonly restService: RestService
  ) {}
  async signIn(login: string, password: string, loylityCardNumber: string) {
    try {
      localStorage.setItem('cardNumber', loylityCardNumber);

      const result = this.restService
        .loginUser(login, password, loylityCardNumber)
        .pipe(
          map((token) => {
            this.userService.setToken(token.access_token);
            this.userService.setUser(token.currentUser);
            return token.currentUser;
          })
        );

      return await lastValueFrom(result);
      // const user = await lastValueFrom()
    } catch (error: any) {
      throw Error(error.error.errorText);
    }
  }
  async getUserBy(id: string): Promise<User> {
    try {
      console.log(id);

      return lastValueFrom(this.restService.getUser(id));
    } catch (error) {
      throw Error("User dosn't exist");
    }
  }
  async changePassword(newPassword: string, oldPassword: string) {
    try {
      const currentUser = this.userService.getUser();
      
      if (!currentUser) throw Error('Пользователь не авторизован');
    await lastValueFrom(this.restService.changePassword({
        userId: currentUser.id,
        newPassword,
        oldPassword,
      }));
      this.userService.setUser(currentUser);
    } catch (error:any) {
      throw Error(error.error.errorText);
    }
  }
  registerUser(user: User) {
    if (this.checkUserExist(user))
      throw Error(`user with email: ${user.email} already exist. 
Please try another one`);
    return this.restService.postUser(user).pipe(
      map((newUser) => {
        const objUserJsonStr = JSON.stringify(newUser);
        window.localStorage.setItem('user_' + newUser.login, objUserJsonStr);
        this.userService.setUser(newUser);
      })
    );
    // const dbUsers:User[] = JSON.parse(localStorage.getItem("users")!)
    // if(dbUsers && Array.isArray(dbUsers))
    // this.usersStorage = JSON.parse(localStorage.getItem("users")!)
    // this.usersStorage.push(user)
    // localStorage.setItem("users",JSON.stringify(this.usersStorage))
  }
  checkUserExist(user: User): boolean {
    const dbUsers: User[] = JSON.parse(localStorage.getItem('users')!);
    if (!dbUsers) return false;

    const existingUser = dbUsers.find(
      (u) => u.email === user.email && u.login === user.login
    );
    if (existingUser) return true;
    else return false;
  }
}
