import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
  id: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  tasks: {
    type: [String],
    default: [],
  },
  role: {
    type: String,
    default: "MEMBER",
  },
});

export default mongoose.model("User", User);
