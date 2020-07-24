
import { UserServiceService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username:String="";
  password:String="";
  email:String="";

  constructor(private profileService:UserServiceService) {
   }

  ngOnInit() {
  }

  SignUp(){
    console.log(this.username)
    console.log(this.password)
    console.log(this.email)

    // console.log(customer)

    this.profileService.addUser({
          username:this.username,
          password:this.password,
          email:this.email
        });

    // this.profileService.addCustomer({})

  }


}
