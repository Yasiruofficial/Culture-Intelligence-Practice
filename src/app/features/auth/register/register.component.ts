import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  singUpForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.singUpForm = this.fb.group<{
      fullName: FormControl;
      email: FormControl;
      password: FormControl;
      confirmPassword: FormControl;
    }>(
      {
        fullName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        validators: [this.confirmPassworMatch],
      } as FormControlOptions
    );
  }

  get passwordMismatch() {
    return this.singUpForm.controls['confirmassword'].hasError(
      'passwordMismatch'
    )
      ? 'Password does not match'
      : '';
  }

  confirmPassworMatch(formGroup: FormGroup) {
    const password = formGroup.controls['password'];
    const confirm_password = formGroup.controls['confirmPassword'];
    if (
      password.dirty &&
      confirm_password.dirty &&
      password.value != confirm_password.value
    ) {
      confirm_password.setErrors({
        passwordMismatch: true,
      });
      return {
        passwordMismatch: true,
      };
    } else {
      confirm_password.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    if (this.singUpForm.valid) {
      const user: User = this.singUpForm.value as User;
      this.authService.register(user);
    } else {
      console.log(this.singUpForm);
    }
  }
}
