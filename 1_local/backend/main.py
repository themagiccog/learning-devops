from typing import List
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import os
import urllib
from db import database, contacts
from model import  Contact, ContactIn 
# from model import notes, Note, NoteIn



# This is for OpenAPI settings
app = FastAPI(title = "REST API using FastAPI PostgreSQL Async EndPoints")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/contacts/", response_model=List[Contact], status_code = status.HTTP_200_OK)
async def read_contacts(skip: int = 0, take: int = 20):
    query = contacts.select().offset(skip).limit(take)
    return await database.fetch_all(query)

@app.get("/contacts/{contact_id}/", response_model=Contact, status_code = status.HTTP_200_OK)
async def read_contacts(contact_id: int):
    query = contacts.select().where(contacts.c.id == contact_id)
    return await database.fetch_one(query)

@app.post("/contacts/", response_model=Contact, status_code = status.HTTP_201_CREATED)
async def create_contact(contact: ContactIn):
    query = contacts.insert().values(name=contact.name, address=contact.address, is_male=contact.is_male)
    last_record_id = await database.execute(query)
    return {**contact.dict(), "id": last_record_id}

@app.put("/contacts/{contact_id}/", response_model=Contact, status_code = status.HTTP_200_OK)
async def update_contact(contact_id: int, payload: ContactIn):
    query = contacts.update().where(contacts.c.id == contact_id).values(name=payload.name, address=payload.address, is_male=payload.is_male)
    await database.execute(query)
    return {**payload.dict(), "id": contact_id}

@app.delete("/contacts/{contact_id}/", status_code = status.HTTP_200_OK)
async def delete_contact(contact_id: int):
    query = contacts.delete().where(contacts.c.id == contact_id)
    await database.execute(query)
    return {"message": "Contact with id: {} deleted successfully!".format(contact_id)}

