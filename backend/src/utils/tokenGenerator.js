import jwt from "jsonwebtoken";

export const generateAccessToken = (id, name, email, role) => {
  return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
