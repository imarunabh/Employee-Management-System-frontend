import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router:Router,
              private fb:FormBuilder,
              private service:AuthService,
              private snackbar:MatSnackBar
  ) {}

  loginForm:FormGroup | undefined;

  ngOnInit(){
    this.loginForm= this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
    console.log("running")
  }

  login(){
    console.log(this.loginForm.value)

    this.service.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value,
    ).subscribe((response)=>{
      console.log(response);
      if(StorageService.isAdminLoggedIn()){
        this.router.navigateByUrl("admin/dashboard");
      }
      else if(StorageService.isEmployeeLoggedIn()){
        this.router.navigateByUrl("employee/dashboard");
      }
    }),
    error=>{
      if(error.status=406){
        this.snackbar.open("User is not active","Close",{duration:5000});
      }
      else{
        this.snackbar.open("Bad Credentials","Close",{duration:5000});
      }
    }
  }

}
