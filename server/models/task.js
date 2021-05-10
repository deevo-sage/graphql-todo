import mongoose from "mongoose";

const Task = new mongoose.Schema(
  {
    id: String,
    aim: String,
    status: { type: Boolean, default: false },
  },
  { created_at: true }
);

export default mongoose.model("Task", Task);
