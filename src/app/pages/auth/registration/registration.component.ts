import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../entities/users.entity'
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  user: User = new User(new Date().getTime().toString(), '', '', '');
  confirmPassword: string = '';
  constructor(private service: AuthService,private readonly messageService:MessageService,
    private readonly router:Router
    ) {}
  ngOnInit(): void {}
  onSubmit(event: Event) {
try {
    this.service.registerUser(this.user);

      this.user = new User(new Date().getTime().toString(), '', '', '');

        this.messageService.add({
          severity:'succes',
          closable:true,
          summary:`Вы зарегистрировались как${this.user.login}`,
        })
      setTimeout(()=>{
      this.router.navigate(["tickets","list"])

      },1000)
} catch (error) {
  this.messageService.add({
    closable:true,
    severity:'error',
    summary:(<Error>error).message
  })
}
    }
  passwordEqualConfirm(){
    return this.user.password === this.confirmPassword
  }
  submitButtonDisabled(){
    if(!this.user.email||!this.user.login||!this.user.password||!this.passwordEqualConfirm())
    return true
    return false
  }
}
