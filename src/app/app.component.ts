import {Component, inject, OnDestroy} from '@angular/core';


import {Router, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {LoginService} from './services/login/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatIconButton,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent implements OnDestroy{

  private router = inject(Router);
  loginService = inject(LoginService);

  private logoutSubscription : Subscription | null = null;

  ngOnDestroy() {
    this.logoutSubscription?.unsubscribe();
  }

  logout(){
    this.logoutSubscription = this.loginService.logout().subscribe({
      next: _ => {
        this.navigateToLogin();
      },
      error: _ => {
        this.navigateToLogin();
      }
    })
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

  navigateHome(){
    this.router.navigate(['home'])
  }

}
