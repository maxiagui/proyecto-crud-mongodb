//Métodos de las categorías
import Category from "../models/categoryModel.js";

//los metodos http se pasan entre parentesís ej: (post)
export const getAll =async (req, res)=>{
    // se ejecuta por http (get)
    try{
        const categories = await Category.find();
        //se valida que haya categorías
        if (categories.length === 0) {
          return res.status(404).json({ message: "There are no categories"});
        }
        //se lsita por Json
        res.status(200).json(categories);
    }catch (error){
        res.status(500).json({messaje: "Internal server error", error});
    }
};
export const create = async (req, res) => {
    // tomar datos de body (post)
    try {
      const categoryData = new Category(req.body);
      const { name } = categoryData;
      const categoryExist = await Category.findOne({ name });
      //se valida si la categoría existe por el nombre
      if (categoryExist) {
        return res.status(400).json({ message: `Category ${name} already exist` });
      }
      //se guarda la nueva categoría
      const savedCategory = await categoryData.save();
      res.status(200).json(savedCategory);
    } catch (error) {
      res.status(500).json({ message: "internal server error", error });
    }
  };

  export const update = async (req, res) => {
    try {
      //saber que vamos a actualizar con un identificador unico id (put)
      const id = req.params.id;
      //saber si existe la entidad a actualizar
      const categoryExist = await Category.findOne({ _id: id });
      if (!categoryExist) {
        return res.status(404).json({ message: "Category not found" });
      }
      //actualizamos datos de categoria
      const updateCategory = await Category.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      res.status(201).json({ message: 'Category update!', updateCategory});
    } catch (error) {
      res.status(500).json({ error: "internal server error" });
    }
  };
  
  export const deleteCategory = async (req, res) => {
    try {
      //saber que vamos a eliminar con un identificador unico id (delete)
      const _id = req.params.id;
      const categoryExist = await Category.findOne({ _id });
      //se valida para saber si existe la entidad a eliminar
      if (!categoryExist) {
        return res.status(404).json({ message: "Category not found" });
      }
      //Se elimina la categoría
      await Category.findByIdAndDelete(_id);
      res.status(201).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "internal server error" });
    }
  };
  