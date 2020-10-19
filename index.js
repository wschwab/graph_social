const { ApolloServer } = require('apollo-server');
// following needed for types
const gql = require('graphql-tag');

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

server.listen({ port: 5555 })
    .then(res => {
        console.log(`server running at ${res.url}`)
    })