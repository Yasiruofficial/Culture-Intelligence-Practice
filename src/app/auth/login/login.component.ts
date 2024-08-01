import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService) {}

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    this.authService.loginPopup().subscribe({
      next: (result) => {
        console.log(result);
        this.setLoginDisplay();
      },
      error: (error) => console.log(error),
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
