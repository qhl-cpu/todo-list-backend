const express = require('express');
const cookieParser = require("cookie-parser");    
const connectDB = require('./dbConfig/db'); 
const { errorHandler } = require('./middlewares/errorHandler');
const schema = require('./graphQL/graphQLSchema');
const resolvers = require('./graphQL/graphQLResolvers');
// const { graphqlHTTP } = require('express-graphql');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
require('dotenv').config();

const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');

const app = express();
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
app.use(express.json())

const server = new ApolloServer({
  schema,
  resolvers
})

// console.log(server);
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 3001 }
// })
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3001 }
  });
  console.log(`Server running at ${url}`);
}

startServer();

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: resolvers,
//   graphiql: true,
// }));

app.use('/user', userRouter);
app.use('/todo', todoRouter);

// setup error handling middlewares
app.use(errorHandler);

connectDB(app);

module.exports = app;