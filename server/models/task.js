import mongoose from "mongoose";

const Task = new mongoose.Schema({
  id: String,
  aim: String,
  status: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Task", Task);
