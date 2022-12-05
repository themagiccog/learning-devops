from typing import List
import databases
import sqlalchemy
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import urllib
import asyncio
import json

# SQLAlchemy specific code, as with any other app
## Using SQLite
DATABASE_URL = "sqlite:///./testx.db"


database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

contacts = sqlalchemy.Table(
    "contacts",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("address", sqlalchemy.String),
    sqlalchemy.Column("is_male", sqlalchemy.Boolean),
)


# Using SQLite DB
engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
metadata.create_all(engine)


# This is Model (using Pydantic)
class ContactIn(BaseModel):
    name: str
    address: str
    is_male: bool

class Contact(BaseModel):
    id: int
    name: str
    address: str
    is_male: bool

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

@app.get("/contacts/{contact_id}/", response_model=Contact, status_code = status.HTTP_200_OK)
async def read_contacts(contact_id: int):
    query = contacts.select().where(contacts.c.id == contact_id)
    print(query)
    print("My ID: " + str(contact_id))
    return await database.fetch_one(query)