// src\app\details\details.component.ts

import { Component, OnInit } from '@angular/core'; 
//import { Contact } from 'app/model';
import { ContactService } from 'app/contact.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  contactdetails: any = []

  constructor(private contactservice: ContactService) { }

  ngOnInit(): void {
    //No Observable
    // this.contactdetails = this.contactservice.getContacts(); 
    // console.log(this.contactdetails); // show in console

    // Using Observable
    this.contactservice.getContacts()
      .subscribe(value => {
        console.log(value);
        this.contactdetails = value;
      });
  }
}
