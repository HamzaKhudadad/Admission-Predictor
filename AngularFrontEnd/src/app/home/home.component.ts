import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './../user-service.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   public title: String = "";
   public cntrs;
   public chunks;


  constructor(private profileService:UserServiceService) { }

  ngOnInit() {



       console.log("calling");

         console.log(localStorage.user);

       this.profileService.getdata(localStorage.user).then((val) => {
            console.log(val);

            this.title=val.data.title;
            this.chunks=val.data.chunks;
            this.cntrs=val.data.country;

            console.log(this.title);
            console.log(this.cntrs);
            console.log(this.chunks);


       })

     


  }





}
