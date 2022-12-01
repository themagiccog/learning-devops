from pydantic import BaseModel
from db import sqlalchemy, metadata


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



# notes = sqlalchemy.Table(
#     "notes",
#     metadata,
#     sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
#     sqlalchemy.Column("text", sqlalchemy.String),
#     sqlalchemy.Column("completed", sqlalchemy.Boolean),
# )


# # This is Model (using Pydantic)
# class NoteIn(BaseModel):
#     text: str
#     completed: bool

# class Note(BaseModel):
#     id: int
#     text: str
#     completed: bool      

