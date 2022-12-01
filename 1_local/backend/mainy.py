from typing import List
import databases
import sqlalchemy
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import urllib

# SQLAlchemy specific code, as with any other app
## Using SQLite
DATABASE_URL = "sqlite:///./texst.db"

## Using Postgres
# host_server = os.environ.get('host_server', 'localhost')
# db_server_port = urllib.parse.quote_plus(str(os.environ.get('db_server_port', '5432')))
# database_name = os.environ.get('database_name', 'fastapi')
# db_username = urllib.parse.quote_plus(str(os.environ.get('db_username', 'postgres')))
# db_password = urllib.parse.quote_plus(str(os.environ.get('db_password', 'secret')))
# ssl_mode = urllib.parse.quote_plus(str(os.environ.get('ssl_mode','prefer')))
# DATABASE_URL = 'postgresql://{}:{}@{}:{}/{}?sslmode={}'.format(db_username,db_password, host_server, db_server_port, database_name, ssl_mode)

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

# # Using Postgres
# engine = sqlalchemy.create_engine(
#     DATABASE_URL, pool_size=3, max_overflow=0
# )
# metadata.create_all(engine)

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
    query = contacts.insert().values(text=contact.text, completed=contact.completed)
    last_record_id = await database.execute(query)
    return {**contact.dict(), "id": last_record_id}

@app.put("/contacts/{contact_id}/", response_model=Contact, status_code = status.HTTP_200_OK)
async def update_contact(contact_id: int, payload: ContactIn):
    query = contacts.update().where(contacts.c.id == contact_id).values(text=payload.text, completed=payload.completed)
    await database.execute(query)
    return {**payload.dict(), "id": contact_id}

@app.delete("/contacts/{contact_id}/", status_code = status.HTTP_200_OK)
async def delete_contact(contact_id: int):
    query = contacts.delete().where(contacts.c.id == contact_id)
    await database.execute(query)
    return {"message": "Contact with id: {} deleted successfully!".format(contact_id)}
