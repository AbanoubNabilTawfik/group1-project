import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponseData } from '../auth.response';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  user = new BehaviorSubject<User|null>(null);


  signup(email:string,password:string)
  {
    return this.http.post<IAuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCamgwzZq3mpQBNs6MGDtU49o7whBcgxxU",{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError),tap(responseData=>{
         this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken, +responseData.expiresIn)
    }));
  }

  login(email:string,password:string)
  {
    return this.http.post<IAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCamgwzZq3mpQBNs6MGDtU49o7whBcgxxU',
      {
        
        email:email,
        password:password,
        returnSecureToken:true

      }).pipe(catchError(this.handleError),tap(responseData=>{
        this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken, +responseData.expiresIn)
      }))
  }

  private handleError(errorResponse:HttpErrorResponse)
  {
    let errorMessage ="Unknown error";
      if(!errorResponse.error || !errorResponse.error.error)
        {
          return throwError(()=>errorMessage);
        }
        switch(errorResponse.error.error.message)
        {
          case 'EMAIL_EXISTS' :
            errorMessage ="An email already exists";
            break;
          case  'EMAIL_NOT_FOUND' :
            errorMessage ="Email not found !"
            break;
          case 'INVALID_PASSWORD' :
          errorMessage ="Invalid password !"  
        }
        return throwError(()=>errorMessage)
  }

  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number)
  {
    const expirationDate = new Date(new Date().getTime() + +expiresIn *1000);

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
     this.user.next(user); 
  }

  logout()
  {
    this.user.next(null)
  }
}
