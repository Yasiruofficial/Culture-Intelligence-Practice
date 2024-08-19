import { Injectable } from '@angular/core';
import { AuthRequest } from '../../models/auth.model';
import { User } from '../../models/user.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private messageService: MessageService, private router: Router) {console.log("Created new instance")}

  login = (authRequest: AuthRequest) => {
    const users: User[] = JSON.parse(localStorage.getItem('USERS') ?? '[]');
    const user = users.find(
      (u) => u.email == authRequest.email && u.password == authRequest.password
    );
    if (!user) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Username / Password',
      });
    } else {
      localStorage.setItem("LOGGED_USER", JSON.stringify(user))
      this.router.navigate(['/members']);
    }
  };

  register = (user: User) => {
    const users: User[] = JSON.parse(localStorage.getItem('USERS') ?? '[]');

    const userAlreadyIn = users.find((u) => u.email == user.email);
    if (userAlreadyIn) {
      this.messageService.add({
        severity: 'error',
        summary: 'You already have an Account',
        detail: 'Please login',
      });
    } else {
      users.push(user);
      localStorage.setItem('USERS', JSON.stringify(users));
      this.messageService.add({
        severity: 'success',
        summary: 'You successfully an Account',
        detail: 'Please login',
      });
      this.router.navigate(['/auth/login']);
    }
  };
  logout = () => {};

}
