import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/pages/auth/entities/users.entity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  constructor(private userService:UserService
    ,readonly messageService:MessageService
    ,readonly authService:AuthService
    ) { }
currentUser:User
currentPassword:string
newPassword:string
confirmPassword:string
  ngOnInit(): void {
  this.currentUser =  this.userService.getUser() ?? new User("","","","")  
  }

equalNewPasswordAndConfirm(){
  return this.newPassword === this.confirmPassword
  }
async onSubmit(event:SubmitEvent){
  try {
if(!this.equalNewPasswordAndConfirm())
throw Error("Пароли не совпадают")
await this.authService.changePassword(this.newPassword,this.currentPassword)
      this.messageService.add({
    severity:'succes',
    closable:true,
    summary:`Пароль успешно изменен`,
  })
  this.confirmPassword = ""
  this.newPassword = ""
  this.currentPassword = ""
  } catch (error) {
    this.messageService.add({
      severity:'error',
      closable:true,
      summary:`${(<Error>error).message}`,
    })
  }



}


}
