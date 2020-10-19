require('dotenv').config()

const { ApolloServer } = require('apollo-server');
// following needed for types
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(`mongodb+srv://William:${process.env.MONGO_PASS}@cluster0.oniyx.mongodb.net/<dbname>?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 5555 })
    })
    .then(res => {
        console.log(`server running at ${res.url}`)
    })