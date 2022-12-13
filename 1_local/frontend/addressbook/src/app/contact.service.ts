// \src\app\contact.service.ts

import { Injectable } from '@angular/core';
import { Contact } from 'app/contactmodel';

import { Observable, of, throwError, catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  endpoint = "/contacts"
  // private baseUrl = "http://localhost:7878" + this.endpoint; // Json server endpoint
  private baseUrl = "http://localhost:8000" + this.endpoint; // Json server endpoint
  constructor(private http: HttpClient) { }

  //GET: get all Contacts
  getContacts(): Observable<Contact>{
    console.log('Returning All Contacts');

    return this.http.get<Contact>(this.baseUrl)
  }


  // GET: get single contact via ID
  getContactID(id: any): Observable<Contact>{
    let getUrl = this.baseUrl + "/" + id; 
    console.log('getContactID from contact.service');
    return this.http.get<Contact>(getUrl);
  }

  //POST: add new Contacts
  addContact(contact: Contact): Observable<Contact>{
    console.log('adding new Contacts');

    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    const httpOptions = {
      headers: headers
    };

    return this.http.post<Contact>(this.baseUrl, contact, httpOptions)
  }


  // DELETE: delete contact by id
  deleteContact(contact: Contact):Observable<HttpEvent<Contact>>{
    let id: number = contact.id
    // console.log(id);
    console.log("Deleting.." + contact);

    return this.http.delete<Contact>(this.baseUrl + "/" + id,
    {
      observe: 'events',
      reportProgress: true
    });

  }

}

