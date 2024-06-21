import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { IAuthResponseData } from '../auth.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLoggedInMode = true;
  isLoading=false;
  error:any=null;


  constructor(private authenticationService: AuthenticationService,private router:Router) {

  }

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs :Observable<IAuthResponseData>;
    this.isLoading=true;
    if (this.isLoggedInMode) {
          authObs=this.authenticationService.login(email,password);
    }

    else {
          authObs=this.authenticationService.signup(email,password);
    }

    authObs.subscribe({
      next:data=>{
        console.log(data);
        this.isLoading=false;
        this.router.navigate(['/recipes'])
      },
      error:errorMessage=>{
        this.error=errorMessage;
        this.isLoading=false;
      }
    });

    console.log(form.value);
    form.reset();
  }
}
