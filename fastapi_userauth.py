from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

# define constants for JWT tokens
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# define a dictionary to store user information
fake_users_db = {
    "john@example.com": {
        "username": "john@example.com",
        "full_name": "John Doe",
        "email": "john@example.com",
        "hashed_password": "$2b$12$JkZjKuf/y2U6l3q6PDfkiuky9X.mDbWOFoO.JA7sjZ67Y6Kj7iUQ2",  # password is "secret"
        "disabled": False,
    },
    "jane@example.com": {
        "username": "jane@example.com",
        "full_name": "Jane Smith",
        "email": "jane@example.com",
        "hashed_password": "$2b$12$JkZjKuf/y2U6l3q6PDfkiuky9X.mDbWOFoO.JA7sjZ67Y6Kj7iUQ2",  # password is "secret"
        "disabled": True,
    },
}

# define a function to get user data from the fake database
def get_user(email: str):
    if email in fake_users_db:
        user_dict = fake_users_db[email]
        return user_dict
    return None

# create a hash context for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# create a FastAPI app instance
app = FastAPI()

# create a security scheme for OAuth2 password flow
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# define a function to generate access tokens
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# define a route to generate access tokens
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not pwd_context.verify(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# define a function to get the current user from the JWT token
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload["sub"]
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user = get_user(email)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# define a route that requires authentication
@app.get("/users/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user

