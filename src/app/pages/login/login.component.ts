import {Component, inject, OnDestroy} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import {Credentials, LoginService} from '../../services/login/login.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscribtion: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    'username': ['', [Validators.required]],
    'password': ['', Validators.required]
  })

  invalidCredentials = false;

  login(){
    this.loginSubscribtion = this.loginService.login(
      this.loginFormGroup.value as Credentials
    ).subscribe({
      next: (result: User | null | undefined) => {
        this.navigateHome();
      },
      error: error => {
        this.invalidCredentials = true;
      }
    });
  }

  navigateHome(){
    this.router.navigate(['home']);
  }

  ngOnDestroy(){
    this.loginSubscribtion?.unsubscribe();
  }

}
