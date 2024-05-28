const UserModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Validaciones iniciales
        if (!email) {
            throw new Error('Proporcione un correo electrónico valido');
        }
        if (!password) {
            throw new Error('Proporcione una contraseña');
        }
        if (!name) {
            throw new Error('Proporcione un nombre');
        }

        // Verificar si el usuario ya existe
        const user = await UserModel.findOne({ where: { email } });

        if (user) {
            throw new Error('Algo salió mal : 3');
        }

        // Crear hash del password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Crear nuevo usuario
        const newUser = new UserModel({
            ...req.body,
            password: hashPassword,
            role : "NORMAL",
        });

        // Guardar usuario en la base de datos
        const saveUser = await newUser.save();

        // Responder con éxito
        res.status(201).json({
            message: 'Usuario creado exitosamente!',
            error: false,
            success: true,
            data: saveUser
        });

    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
