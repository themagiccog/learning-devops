// src\app\app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { NewComponent } from './new/new.component';

import { HttpClient, HttpClientModule } from '@angular/common/http' // add http

import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // using reactive forms and regular forms

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
