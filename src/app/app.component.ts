import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EMS';

  constructor(private router:Router){}

  isAdminLogged:boolean;
  isEmployeeLogged:boolean;

  ngOnInit(){
    this.updateProfile();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.updateProfile();
      }
    })
  }

  updateProfile(){
    this.isAdminLogged= StorageService.isAdminLoggedIn();
    this.isEmployeeLogged=StorageService.isEmployeeLoggedIn();
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl('login');
  }

  
}
