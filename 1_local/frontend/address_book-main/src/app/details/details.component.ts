// src\app\details\details.component.ts

import { Component, OnInit } from '@angular/core'; 
//import { Contact } from 'app/model';
import { ContactService } from 'app/contact.service'
import { Contact } from 'app/contactmodel';

import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  contactdetails: any
  _name: string = ""
  _id: number = 0


  constructor(
    private contactservice: ContactService, 
    private router:Router, 
    private activatedroute:ActivatedRoute, 
    private location:Location) { }



  ngOnInit(): void {

    // Get variable via Routes using getStates (Step 2)
    //Use Subscribe to get Parameter from the Router link:
    let n: number = 0;
    n = this.location.getState() as number;
    if(n !== null) //Meaning no parameters passed
    { 
      console.log("Type 1:" + typeof n);
      console.log("n:" + n);
      this._name = Object.values(n)[0] 
      console.log("Type 2:" + typeof this._name);
      console.log("name:" + this._name);
      console.log("Value is: " + this._name)
      this._id = Object.values(n)[1] 
      console.log("Type 3:" + typeof this._id);
      console.log("ID:" + this._id);
      console.log("Value ID is: " + this._id)
    }
    

    // Using Observable
    this.contactservice.getContact(this._name)
      .subscribe(value => {
        console.log(value);
        this.contactdetails = value;
      });

      this.contactservice.getContactid(this._id)
      .subscribe(value => {
        console.log(value);
        this.contactdetails = value;
      });
  }
}
