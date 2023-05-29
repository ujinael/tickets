import { Router } from '@angular/router';
import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ServerError } from 'src/app/entities/server.entity';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  @Input() childProp: string;
  login: string = '';
  password: string = '';
  loyalityCardNumber: string = '';
  vipStatus: boolean;
  constructor(
    private service: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('cardNumber')
  }

 async onSubmit(event: Event) {
    try {
     await this.service.signIn(this.login, this.password,this.loyalityCardNumber);
      this.messageService.add({
        closable: true,
        severity:'succes',
        summary: `Вы вошли как${this.login}`,
      });
      setTimeout(()=>{
        this.router.navigate(["tickets","list"])
  
        },1000)
    } catch (error) {
      this.messageService.add({
        severity:'warn',
        closable:true,
        summary:(<Error>error).message
        
      })
      
    }
  }
  submitButtonDisabled() {
    if (!this.login || !this.password) return true;
    if (this.vipStatus && this.loyalityCardNumber === '') return true;
    return false;
  }
}
