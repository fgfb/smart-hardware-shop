import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  submitted: boolean = false;

  inValidLogin: boolean = false;

  user: any;

  usersList: IUser[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router) {
      this.createForm();
   }

  ngOnInit(): void { }

  createForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  checkLogin(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }

    this.findUser();
  }

  findUser(){
    this.apiService.getUsers().subscribe({
      next: (user)=> {
        this.usersList = user;
        if(this.usersList?.length){
          this.user = this.usersList.find(user => {
            return user.email === this.loginForm.get('email')?.value;
          });
          if(this.user){
            localStorage.setItem('prod:user', JSON.stringify(this.user));
            this.router.navigate(['/']);
          } else {
            this.inValidLogin = true;
          }
        }
      },
      error: err => {
        console.error(err);
        this.inValidLogin = true;
      }
    });
  }

}
