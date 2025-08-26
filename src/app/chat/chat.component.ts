import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  auth = inject(AuthService);
  data: any;

  constructor() {
    if (this.auth.isLoggedIn()) {
      this.auth.getProtectedData().subscribe((res) => (this.data = res));
    }
  }
}
