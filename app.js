const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let usuarios = [];

// POST /users: Crear un nuevo usuario
app.post("/users", (req, res) => {
    const { dpi, name, email, password } = req.body;
    const usuarioExistente = usuarios.find(usuario => usuario.dpi === dpi);

    if (usuarioExistente) {
        return res.status(400).json({ mensaje: "El DPI ya está registrado" });
    }

    const nuevoUsuario = { dpi, name, email, password };
    usuarios.push(nuevoUsuario);
    res.status(201).json({ mensaje: "Usuario creado", usuario: nuevoUsuario });
});

// GET /users: Listar todos los usuarios registrados
app.get("/users", (req, res) => {
    res.status(200).json({ usuarios });
});

// PUT /users/:dpi: Actualizar un usuario existente
app.put("/users/:dpi", (req, res) => {
    const { dpi } = req.params;
    const { name, email, password, nuevoDpi } = req.body;
    const usuarioIndex = usuarios.findIndex(usuario => usuario.dpi === dpi);

    if (usuarioIndex === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (nuevoDpi && usuarios.some(usuario => usuario.dpi === nuevoDpi)) {
        return res.status(400).json({ mensaje: "El nuevo DPI ya está registrado" });
    }

    const usuarioActualizado = { ...usuarios[usuarioIndex], name, email, password, dpi: nuevoDpi || dpi };
    usuarios[usuarioIndex] = usuarioActualizado;
    res.status(200).json({ mensaje: "Usuario actualizado", usuario: usuarioActualizado });
});

// DELETE /users/:dpi: Eliminar un usuario
app.delete("/users/:dpi", (req, res) => {
    const { dpi } = req.params;
    const usuarioIndex = usuarios.findIndex(usuario => usuario.dpi === dpi);

    if (usuarioIndex === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuarios.splice(usuarioIndex, 1);
    res.status(200).json({ mensaje: "Usuario eliminado" });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});