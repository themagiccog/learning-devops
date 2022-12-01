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
  private baseUrl = "http://localhost:8001" + this.endpoint; // Json server endpoint
  constructor(private http: HttpClient) { }

  //GET: get all Contacts
  getContacts(): Observable<Contact>{
    console.log('Returning All Contacts');

    return this.http.get<Contact>(this.baseUrl)
  }

  //GET: get single contact via name
  getContact(name: string): Observable<Contact>{
    let parameters = new HttpParams().set('name', name);

    return this.http.get<Contact>(this.baseUrl, {
      params: parameters
    });
  }

  //GET: get single contact via name
  getContactid(id: number): Observable<Contact>{
    let parameters = new HttpParams().set('id', id);

    return this.http.get<Contact>(this.baseUrl, {
      params: parameters
    });
  }


  //POST: add new Contact
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
  
  //PUT(INCOMPLETE): update  Contact
  updateContact(contact: Contact): Observable<Contact>{
    console.log('updating Contact');

    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    const httpOptions = {
      headers: headers
    };

    return this.http.put<Contact>(this.baseUrl, contact, httpOptions)
  }


  // DELETE: delete contact by id
  deleteContact(contact: Contact):Observable<HttpEvent<Contact>>{
    let id: number = contact.id
    console.log(id);
    console.log("Deleting.." + contact);

    return this.http.delete<Contact>(this.baseUrl + "/" + id,
    {
      observe: 'events',
      reportProgress: true
    });

  }

}

