import jwt from "jsonwebtoken";
export const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET_KEY);
  };