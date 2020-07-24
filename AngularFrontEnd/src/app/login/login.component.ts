import { UserServiceService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String = "";
  password: String = "";
  isValid:Boolean=false;


  constructor(private profileService:UserServiceService, private router:Router) { }

  ngOnInit() {
  }

  // Login() {
  //
  //
  //   console.log(this.password)
  //   console.log(this.email)
  //
  //   this.profileService.login({
  //     email: this.email,
  //     password: this.password
  //
  //
  //   }).subscribe(
  //     data => { this.router.navigate(['/home']);},
  //     err=> {console.log(err);}
  //
  // );
  //
  //
  // }




  Log() {

    console.log(this.password);
    console.log(this.email);

    this.profileService.log({
      email: this.email,
      password: this.password
    }).then((val) => {

      if (val.data.es = "Exist") {
        console.log(val.data);

       localStorage.setItem('user', JSON.stringify(val.data.user) );
        //localStorage.isValid="true"
        this.isValid=false;
        this.router.navigate(['/home']);
        this.isValid=true;
        console.log(localStorage.getItem('user'))
      }
      else{
        //localStorage.isValid="false"
        console.log("else");
        this.isValid=true;
        console.log(this.isValid);

      }

    })

  }



}
