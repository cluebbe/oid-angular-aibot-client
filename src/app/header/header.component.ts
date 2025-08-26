import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Import Router
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router // Inject Router
  ) { }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
