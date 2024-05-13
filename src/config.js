import dotenv from "dotenv";
//carga los valores de un archivo .env
dotenv.config();

//accedemos por process a las variables de entorno (env)
export const PORT = process.env.PORT || 3001; //como medida anti errores, hay que poner acá un puerto alternativo (actual: 3000)
