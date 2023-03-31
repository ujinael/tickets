import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { TabViewModule } from 'primeng/tabview';
import { AuthComponent } from './auth.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { RegistrationComponent } from './registration/registration.component';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistrationComponent, AuthorizationComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabViewModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
    FormsModule
  ],
  providers:[MessageService]
})
export class AuthModule {}
