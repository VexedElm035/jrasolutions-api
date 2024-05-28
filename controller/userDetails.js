// userDetailsController.js
const UserModel = require('../models/userModel');

async function userDetailsController(req, res) {
    try {
        const user = await UserModel.findByPk(req.userId); // Cambiado a findByPk
        if (!user) {
            return res.status(404).json({
                message: '',
                error: true,
                success: false
            });
        }
        res.status(200).json({
            message: 'Usuario encontrado',
            data: user,
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;
