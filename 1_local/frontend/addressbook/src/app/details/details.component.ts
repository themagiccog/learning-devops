// src\app\details\details.component.ts

import { Component, OnInit } from '@angular/core'; 
//import { Contact } from 'app/model';
import { ContactService } from 'app/contact.service'
import { Contact } from 'app/contactmodel';

import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  contactdetails = new Contact()  // In the html, use ? so that you dont get undefined error.

  constructor(
    private contactservice: ContactService, 
    private router:Router, 
    private activatedroute:ActivatedRoute, 
    private location:Location) { }

  /* Using Subscribe */
  sub: any
  ngOnInit(): void {
      this.sub = this.activatedroute.paramMap.subscribe((params) => {
        console.log("Parameter log: " + params);
        let id = params.get('id');
        // Using Observable
        console.log("xxxxx " + id);
        this.contactservice.getContactID(id)
          .subscribe(response => {
            console.log("(log) ID is: " + id);
            console.log(response);
            this.contactdetails = response;
          });
      });
  }

  // Delete subscription (House Keeping task)
  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['home']);
  }
}