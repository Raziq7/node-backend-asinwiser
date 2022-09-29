import jwt from "jsonwebtoken"

const generatorToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_AUTH_TOKEN, {
    expiresIn: "30d",
  });
};

export default generatorToken;