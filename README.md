# hoja6

POST /users: Crear un nuevo usuario.
El sistema debe validar que el DPI no esté registrado previamente.
Si el DPI ya existe, devolver un error con un código de estado adecuado.
 

GET /users: Listar todos los usuarios registrados.

Debe devolver todos los usuarios almacenados en el arreglo.
PUT /users/: Actualizar un usuario existente.

Validar que el usuario con el DPI proporcionado exista.
El cuerpo de la solicitud puede incluir: name, email,  y password.
Si se intenta cambiar el DPI a uno ya registrado, devolver un error.
DELETE /users/: Eliminar un usuario.

Validar que el usuario con el DPI proporcionado exista.
Si el usuario no existe, devolver un error con un código de estado adecuado.