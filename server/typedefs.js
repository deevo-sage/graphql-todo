import gql from "graphql-tag";
import {
  SchemaDirectiveVisitor,
  defaultFieldResolver,
  AuthenticationError,
} from "apollo-server";
export class AuthorizationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultFieldResolver;
    field.resolve = async (_, input, ctx, __) => {
      if (ctx.user.role === this.args.role) {
        return resolver.call(this, _, input, ctx, __);
      } else {
        return new AuthenticationError("not enough priveleges");
      }
    };
  }
}
export const typeDefs = gql`
  directive @authorization(role: Role) on FIELD_DEFINITION
  type Task {
    id: ID!
    aim: String!
    status: Boolean!
    created_at: String!
  }
  enum Role {
    ADMIN
    MEMBER
  }
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    tasks: [Task]!
    token: String!
    role: Role
  }
  type Query {
    users: [User]! @authorization(role: ADMIN)
    user: User!
    task: Task!
    tasks: [Task]!
  }

  type Mutation {
    signin(email: String!, password: String!): User!
    signup(
      email: String!
      password: String!
      name: String!
      role: Role = "MEMBER"
    ): User!
    createtask(aim: String!): Task!
    updatetask(id: String!, status: Boolean!): Task!
  }
`;
