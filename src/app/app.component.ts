import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { HeaderComponent } from './component/header/header.component';
import { SuccessAlertComponent } from './alert/success/success.alert';
import { FailAlertComponent } from './alert/fail/fail.alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SuccessAlertComponent, FailAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.getLoginStatus().isLoggedIn
    if (!this.isLoggedIn && this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }
}
