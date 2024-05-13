//Métodos de usuario
import User from "../models/userModel.js";

//los metodos http se pasan entre parentesís ej: (post)

export const getAll = async (req, res) => {
  try {
    // se ejecuta por http (get)
    const users = await User.find();
    //se valida que haya usuarios
    if (users.length === 0) {
      return res.status(404).json({ message: "There are no users" });
    }
    //se lsita por Json
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};


export const create = async (req, res) => {
  try {
    // tomar datos de body (post)
    const userData = new User(req.body);
    // buscar si existe usuario (filtrar por email)
    const { email } = userData;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: `User with email: ${email} already exist` });
    }
    //se guarda el usuario nuevo
    const savedUser = await userData.save();
    // mostrar informacion del usuario guardado
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const update = async (req, res) => {
  try {
    //saber que vamos a actualizar con un identificador unico id (put)
    const id = req.params.id;
    //saber si existe la entidad a actualizar
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    //actualizamos datos de usuario
    const updateUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    //saber que vamos a eliminar con un identificador unico id (delete)
    const _id = req.params.id;
    const userExist = await User.findOne({ _id });
        //se valida para saber si existe la entidad a eliminar
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    //Se elimina el usuario
    await User.findByIdAndDelete(_id);
    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
