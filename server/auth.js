import jwt from "jsonwebtoken";
import Usermodel from "./models/user";
const secret = "todoserver";

export const createToken = ({ id, email }) => jwt.sign({ id, email }, secret);

export const getUserFromToken = async (token) => {
  try {
    if (token !== null) {
      const temp = jwt.verify(token, secret);
      const user = await Usermodel.findById(temp.id);
      user.token = token;
      return user;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
  
};
