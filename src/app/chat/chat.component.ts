import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  auth = inject(AuthService);
  data: any;

  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;

  public userInput: string = '';
  public personToImpersonate: string = '';
  chatMessages: { sender: string; text: string }[] = [];

  constructor() {
    if (this.auth.isLoggedIn()) {
      this.auth.sendMessage("hello","Arnold Schwarzenegger").subscribe((res) => {console.log(res); this.data = res});
    }
  }

  sendMessage() {
    
    if (this.userInput.trim()) {
      
      const userMessage = this.userInput.trim();
      this.chatMessages.push({ sender: 'You', text: userMessage });
      this.userInput = '';
      this.auth.sendMessage(userMessage, this.personToImpersonate)
        .subscribe({
          next:(response: any) => {
            const assistantMessage = response.choices[0]?.message?.content || 'No response received.';
            console.log(response);
            this.chatMessages.push({ sender: this.personToImpersonate, text: assistantMessage  });
            setTimeout(() => {
              this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
            }, 500);
          }, 
          error:(error: any) => {

            alert( 'Error: ' + error.message + '\nCause: ' + error.cause.error);
          }       
        });
      


      }
    }

  
}
