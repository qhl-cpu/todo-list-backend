const { gql } = require('apollo-server');
const typeDefs = gql`
  type Todo {
    id: ID!
    userId: String!
    title: String!
    description: String
    category: String
    createdAt: String
    updatedAt: String
  }
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String
    lastName: String
    createdAt: String
    updatedAt: String
  }
  type AuthData {
    token: String!
    user: User!
  }
  type Query {
    getFirstTodos: [Todo]
    getAllTodos: [Todo]
    getFilteredTodos(category: String, title: String): [Todo]
  }
  type Mutation {
    createTodo(userId: String!, title: String!, description: String, category: String): Todo
    updateTodo(todoId: ID!, userId: String!, updateData: TodoInput): Todo
    deleteTodo(todoId: ID!, userId: String!): Todo
    registerUser(email: String!, password: String!, firstName: String, lastName: String): User
    loginUser(email: String!, password: String!): AuthData
  }
  input TodoInput {
    title: String
    description: String
    category: String
  }
`;
module.exports = typeDefs;