const UserModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function userSignInController(req,res){
    try{
        const {email,password}=req.body;
        
        if (!email) {
            throw new Error('Proporcione un correo electrónico valido');
        }
        if (!password) {
            throw new Error('Proporcione una contraseña');
        }

        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            throw new Error('Algo salió mal : 1');
        }

        const checkPassword = await bcrypt.compareSync(password, user.password);

        if (checkPassword) {
            const tokenData={
                id:user.id,
                email:user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: 60*60*8 });
            
            const tokenOption={
                httpOnly:true,
                secure:true
            }

            res.cookie("token",token,tokenOption).status(200).json({
                message: 'Inicio de sesión exitoso!',
                data: token,
                error: false,
                success: true
            })
            
        } else{
            throw new Error('Algo salió mal : 5');  
        }


    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }


}

module.exports=userSignInController;