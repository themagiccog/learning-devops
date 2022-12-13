import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contactmodel'; // Imported from model.ts used as model
import { ContactService } from 'app/contact.service'

import * as uuid from "uuid";

import { FormControl, FormGroup, Validators} from '@angular/forms'; // Use Forms
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    sex : new FormGroup({
      is_male: new FormControl(''),
    })
  });

  contact: Contact = new Contact()
  constructor(private contactservice: ContactService, private router: Router) { }

  ngOnInit(): void {
  }

  // Output: Emitter
  @Output()
  create = new EventEmitter();

  createContact(){
    this.contact = new Contact({
      name: this.profileForm.value.name, 
      address: this.profileForm.value.address, 
      is_male: this.profileForm.value.sex.is_male
    });
    console.log(this.contact)

    //Using EventEmitter
    this.contactservice.addContact(this.contact)
      .subscribe(res => {
        console.log(res)
        this.create.emit();
      })

      // Return Home after submit
      this.router.navigate(['home'])
      .then(() => {
        window.location.reload();
      });
  }


}
