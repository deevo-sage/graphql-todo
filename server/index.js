import { ApolloServer } from "apollo-server";
import mongodb from "mongoose";
import config from "./config";
import { resolvers } from "./resolvers";
import { AuthorizationDirective, typeDefs } from "./typedefs";
import Usermodel from "./models/user";
import { getUserFromToken } from "./auth";
mongodb.connect(
  config.db,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      throw Error("mongo connection failed");
    }
  }
);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    authorization: AuthorizationDirective,
  },
  // mockEntireSchema: true,
  // mocks: true,
  async context({ req }) {
    const user = await getUserFromToken(req.headers.authorization);
    return { user };
  },
});
server.listen().then(({ url }) => console.log(`server at ${url}`));
