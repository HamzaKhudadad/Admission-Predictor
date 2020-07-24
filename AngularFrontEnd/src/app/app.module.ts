import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { NavComponent } from './nav/nav.component';
import { PredictionComponent } from './prediction/prediction.component';




const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent, },
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'news', component:NewsComponent},
  {path: 'nav', component:NavComponent},
    {path: 'prediction', component:PredictionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NewsComponent,
    NavComponent,
    PredictionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
