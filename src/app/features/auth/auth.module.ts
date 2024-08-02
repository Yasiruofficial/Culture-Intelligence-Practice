import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import {DividerModule} from 'primeng/divider';
import { RouterModule } from '@angular/router';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth/auth.service';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    TableModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    DividerModule,
    RouterModule,
    ToastModule
  ],
  providers:[MessageService,AuthService]
})
export class AuthModule { }
