import Usermodel from "./models/user";
import Taskmodel from "./models/task";
import { createToken } from "./auth";
import { AuthenticationError } from "apollo-server-errors";

export const resolvers = {
  Query: {
    users: async () => {
      const users = await Usermodel.find({});
      return users;
    },
    user: async (_, input, { user }, info) => {
      return user;
    },
    task: async () => {},
    tasks: async (_, { id, status }, { user }) => {
      const tasks = await Taskmodel.find({ _id: { $in: user.tasks } })
        .sort({
          created_at: -1,
        })
        .exec();
      return tasks;
    },
  },
  Mutation: {
    signin: async (_, { email, password }) => {
      const user = await Usermodel.findOne({ email });
      if (user.password === password) {
        user.token = createToken({ id: user.id, email: user.email });
        return user;
      }
      new AuthenticationError("user not found");
    },
    signup: async (_, input) => {
      const user = await Usermodel.create(input);
      user.id = user._id;
      await user.save();
      user.token = createToken({ id: user.id, email: user.email });
      return user;
    },
    createtask: async (_, input, { user }) => {
      if (user) {
        const task = await Taskmodel.create(input);
        task.id = task._id;
        await task.save();
        user.tasks = [task.id, ...user.tasks];
        await Usermodel.findByIdAndUpdate(user._id, { tasks: user.tasks });
        return task;
      } else new AuthenticationError("not loggedin");
    },
    updatetask: async (_, { id, status }) => {
      const task = await Taskmodel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      return task;
    },
  },
  User: {
    tasks: async (user) => {
      const tasks = await Taskmodel.find({ _id: { $in: user.tasks } })
        .sort({
          created_at: -1,
        })
        .exec();

      return tasks;
    },
  },
};
