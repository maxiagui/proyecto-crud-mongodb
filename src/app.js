import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./db/connection.js";
import { PORT } from "./config.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
connectDB();

//ruta de autenticación
app.use("/api/auth", authRoute);

//rutas de usuario
app.use("/api/user", userRoute);

//rutas de producto
app.use("/api/product", productRoute);

//rutas de categorias
app.use("/api/category", categoryRoute);


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });