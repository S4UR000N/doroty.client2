import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private authService: AuthService, router: Router) {
    if (!authService.getLoginStatus().isLoggedIn) {
      router.navigate(['/login']);
    }
  }
}
