from fastapi import APIRouter # permite definir rutas
from config.db import conn # importar la conexion a la base de datos
from schemas.user import user_entity, users_entity # importar el esquema de usuario
from models.user import User # importar el modelo de usuario

user = APIRouter()

@user.get('/users')
def find_all_user():
    return users_entity(conn.local.user.find())

@user.post('/users')
def create_user(user: User):
    new_user = dict(user)

    id = conn.local.user.insert_one(new_user).inserted_id

    return id

@user.get('/users/{id}')
def find_user():
    return 'Find User!'

@user.put('/users/{id}')
def update_user():
    return 'Update User!'

@user.delete('/users/{id}')
def delete_user():
    return 'Delete User!'