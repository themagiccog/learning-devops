import { Component, OnInit } from '@angular/core';

import { Contact } from '../contactmodel'; // Imported from model.ts used as model

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  address = ['Zachary', 'Lousiana',
  'Baton Rouge', 'Mars'];

  defaultcontact = new Contact('Zola', 'Zachary', false );

  submitted = false;

  onSubmit() { this.submitted = true; }
  
  AzahContact(): Contact {
    const newContact =  new Contact('Azah', 'Louisiana', false);
    console.log('Contact is: ' + newContact.name); // "My contact is Azah"
    return newContact;
  }

}
