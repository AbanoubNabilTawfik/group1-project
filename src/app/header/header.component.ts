import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DatastorageService } from '../services/datastorage.service';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  implements OnInit , OnDestroy{
  
  private userSubscription :Subscription;

  isAuthenticated=false;


  constructor(private router:Router,private dataStorageService:DatastorageService,private authenticationService:AuthenticationService)
  {

  }

  ngOnInit(): void {
   this.userSubscription = this.authenticationService.user.subscribe((user)=>{
    this.isAuthenticated =  !user ? false :true;
   })
   console.log("on init authencticated",this.isAuthenticated)
  }
  
  onSaveData()
  {
     this.dataStorageService.storeRecipes();
  }

  onFetchRecipes()
  {
    this.dataStorageService.fetchRecipes();
  }

  onLogout()
  {
    this.isAuthenticated=false;
    console.log("is authenticated",this.isAuthenticated)
    this.authenticationService.logout();
    this.router.navigate(['/auth'])
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
