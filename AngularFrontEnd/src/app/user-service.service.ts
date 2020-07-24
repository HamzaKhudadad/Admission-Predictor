import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions, Request, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  addUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post("http://localhost:3000/signup", user, httpOptions).subscribe()
  }

  login(user){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
var r = this.http.post("http://localhost:3000/", user,httpOptions);
 return  r

}

log(user){

 return  axios.post("http://localhost:3000/",user)

}

getdata(user){

 return  axios.get("http://localhost:3000/home",user)

}

getprediction(data){
return  axios.post("http://localhost:3000/UniversityAcceptence",data)

}


}
