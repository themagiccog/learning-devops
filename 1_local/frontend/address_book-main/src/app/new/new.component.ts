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



  id: number | undefined
  name: string | undefined
  address: string | undefined
  is_male: boolean | undefined
  contact: Contact = new Contact()

  constructor(private contactservice: ContactService, private router: Router) { }

  ngOnInit(): void {
  }

  @Output()
  create = new EventEmitter();

  createContact(){
    this.name = this.profileForm.value.name;
    this.address = this.profileForm.value.address;
    this.is_male = this.profileForm.value.sex.is_male;

    this.contact = new Contact({name: this.name, address: this.address, is_male: this.is_male});
    console.log(this.contact)

    //Using EventEmitter way (works with EventEmitter declared above)
    this.contactservice.addContact(this.contact)
      .subscribe(res => {
        console.log(res)
        this.create.emit();
      })

    // //Using Alternate way (No EventEmitter)
    // this.contactservice.addContact(this.contact)
  }


}
