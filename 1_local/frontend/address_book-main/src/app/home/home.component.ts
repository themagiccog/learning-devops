import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactService } from 'app/contact.service'
import { Contact } from 'app/contactmodel';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allcontacts: any = []

  constructor(private contactservice: ContactService, private router:Router,) { }

  ngOnInit(): void {
    this.fetchData()
  }

  @Output()
  create = new EventEmitter();

  delete(item: Contact) {
    //alert('Delete ' + item.id);

    //Using EventEmitter way (works with EventEmitter declared above)
    this.contactservice.deleteContact(item)
      .subscribe(() => {
        this.allcontacts = this.allcontacts.filter((c: any) => c.id !== item.id)
      }) //this filter forces UI to update byreloading all contacts save for the one that was just deleted.

    // Not using Event Emitter
    //this.contactservice.deleteContact(item)

  }

  fetchData() {
    this.contactservice.getContacts()
      .subscribe(value => {
        //console.log(value);
        this.allcontacts = value;
      });
  }

  onClick(item_name: any) { 
        console.log(item_name);
        this.router.navigate(['details',item_name])
  }
}
