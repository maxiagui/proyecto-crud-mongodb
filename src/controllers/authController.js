//Método de validación del Login

import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//los metodos http se pasan entre parentesís ej: (post)
export const validate = async (req, res) => {
  try {
    // tomar datos de email del body (post)
    const userFound = await User.findOne({ email: req.body.email });
    //validar si existe
    if (!userFound) {
      res
        .status(400)
        .json({ message: "Email and/or password are incorrect"});
    }
    //La contraseña es encriptada y la comparamos contra la guardada
    if (bcrypt.compareSync(req.body.password, userFound.password)) {
      const payload = {
        userId: userFound._id,
        userEmail: userFound.email,
      };
      //firmar token con jwt
      //payload, secreto, tiempo de expiracion
      const token = jwt.sign(payload, "secreto", { expiresIn: "1h" });
      res.status(200).json({ message: `Correct login. Here is your token: ${ token }`});
    } else {
      res
        .status(400)
        .json({ message: "Email and/or password are not correct" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};