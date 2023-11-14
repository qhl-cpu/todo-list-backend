const { 
  findAllTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo, 
  getFilteredTodos 
} = require('../services/todoService');
const {
  registerUser, 
  loginUser
} = require('../services/userService');

let todoData = [
  {
    id: 1,
    userId: 1,
    title: 'do laundry',
    type: 0,          // 0: routine | 1: work
    completed: false, // false: doing | true: done
  },
  {
    id: 2,
    userId: 1,
    title: 'check account data',
    type: 1,
    completed: false,
  },
  {
    id: 3,
    userId: 1,
    title: 'have a meeting',
    type: 1,
    completed: false,
  },
]

const resolvers = {
      // Fetch all todos
      Query: {
        getFirstTodos: () => {
            console.log(111)
            return [];
            // Fetch data logic
          
        },
      },
      getAllTodos: () => {
            console.log(111)
        return findAllTodos();
      },
      // Fetch filtered todos
      getFilteredTodos: (_, { category, title }) => {
          return getFilteredTodos(category, title);
      },
      // Add other queries for users if needed
  Mutation: {
      // Create a new todo
      createTodo(_, { userId, title, description, category }) { 
          return createTodo(userId, title, description, category);
      },
      // Update a todo
      updateTodo: (_, { todoId, userId, updateData }) => {
          return updateTodo(todoId, userId, updateData);
      },
      // Delete a todo
      deleteTodo: (_, { todoId, userId }) => {
          return deleteTodo(todoId, userId);
      },
      // Register a new user
      registerUser: (_, { email, password, firstName, lastName }) => {
          return registerUser(email, password, firstName, lastName);
      },
      // Login a user
      loginUser: (_, { email, password }) => {
          return loginUser(email, password);
      },
      // Add other mutations for users if needed
  }
};

module.exports = resolvers;
