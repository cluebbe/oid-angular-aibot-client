import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  auth = inject(AuthService);
  data: any;

  constructor() {
    if (this.auth.isLoggedIn()) {
      this.auth.getProtectedData().subscribe((res) => (this.data = res));
    }
  }
}