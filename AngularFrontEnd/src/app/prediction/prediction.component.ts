import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './../user-service.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {

  cgpa;
  toefl ;
  gre;
  uni;
  research;
  reslt:Number=0.0;




  constructor(private profileService:UserServiceService) { }

  ngOnInit() {
  }

predict(){
  console.log(this.cgpa);
    console.log(this.uni);
    console.log(this.research);


    this.profileService.getprediction({
      cgpa: this.cgpa,
      toefl: this.toefl,
      gre:this.gre,
      uni:this.uni,
      research:this.research

    }).then((val) => {

    this.reslt=((val.data));
  })

    }










}
