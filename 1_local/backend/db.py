import databases 
import sqlalchemy


## Using SQLite
DATABASE_URL = "sqlite:///./testx.db"

# ## POSTGRESQL
# host_server = os.environ.get('host_server', 'localhost')
# db_server_port = urllib.parse.quote_plus(str(os.environ.get('db_server_port', '5432')))
# database_name = os.environ.get('database_name', 'fastapi')
# db_username = urllib.parse.quote_plus(str(os.environ.get('db_username', 'postgres')))
# db_password = urllib.parse.quote_plus(str(os.environ.get('db_password', 'secret')))
# ssl_mode = urllib.parse.quote_plus(str(os.environ.get('ssl_mode','prefer')))
# DATABASE_URL = 'postgresql://{}:{}@{}:{}/{}?sslmode={}'.format(db_username, db_password, host_server, db_server_port, database_name, ssl_mode)
# #If database server required SSL then replace prefer with required in the DATABASE_URL connection string for PostgreSQL.

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

# # Using PostgreSQL
# engine = sqlalchemy.create_engine(
#     DATABASE_URL, pool_size=3, max_overflow=0
# )

metadata.create_all(engine)
