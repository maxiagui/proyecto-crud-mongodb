//Métodos de los productos
import Product from "../models/productModel.js";

//los metodos http se pasan entre parentesís ej: (post)
export const getAll = async (req, res) => {
      // se ejecuta por http (get)
  try {
    //Se completa con "populate" el dato "name" de la categoría
    const products = await Product.find().populate({ path: 'category', select: 'name' });
    //se valida que haya productos
    if (products.length === 0) {
      return res.status(404).json({ message: "There are no products" });
    }
    //se lsita por Json
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const create = async (req, res) => {
  // tomar datos de body (post)
  try {
    const productData = new Product(req.body);
    //se valida si la categoría existe por el nombre
    const { name } = productData;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({ message: `Product ${name} already exist` });
    }
    //se guarda el producto nuevo
    const savedProduct = await productData.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const update = async (req, res) => {
  try {
    //saber que vamos a actualizar con un identificador unico id (put)
    const id = req.params.id;
    //saber si existe la entidad a actualizar
    const productExist = await Product.findOne({ _id: id });
    if (!productExist) {
      return res.status(404).json({ message: "User not found" });
    }
    //actualizamos datos de producto
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(201).json({ message: 'Product update!', updateProduct});
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    //saber que vamos a eliminar con un identificador unico id (delete)
    const id = req.params.id;
    const productExist = await Product.findOne({ _id: id });
      //se valida para saber si existe la entidad a eliminar
    if (!productExist) {
      return res.status(404).json({ message: "Product not found" });
    }
    //Se elimina el producto
    await Product.findByIdAndDelete(id);
    res.status(201).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};