import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent },
];