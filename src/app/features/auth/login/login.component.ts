import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AuthRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  singInForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit = () => {
    if (this.singInForm.valid) {
      const authRequest: AuthRequest = this.singInForm.value as AuthRequest;
      this.authService.login(authRequest);
    }else{
      console.log(this.singInForm)
    }
  };
}
