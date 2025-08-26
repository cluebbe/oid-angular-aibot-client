import { Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent },
];