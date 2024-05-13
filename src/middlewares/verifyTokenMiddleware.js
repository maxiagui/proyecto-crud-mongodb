import { verifyToken } from "../utils/jws.js";

export const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No access token provided"});
  }
//recortamos el token en 7 espacios inciales para validarlo correctamente
  const token = authHeader.substring(7);

  try {
    const decoded = verifyToken(token);
    //guardar en el usuario que se verificó ok
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Access denied or access time expired" });
  }
};