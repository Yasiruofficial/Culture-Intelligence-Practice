import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  singUpForm = this.fb.group({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit = () => {
    if (this.singUpForm.valid) {
      const user: User = this.singUpForm.value as User;
      this.authService.register(user);
    } else {
      console.log(this.singUpForm);
    }
  };
}
