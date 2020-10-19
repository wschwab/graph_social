require('dotenv').config()

const { ApolloServer } = require('apollo-server');
// following needed for types
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(`mongodb+srv://William:${process.env.MONGO_PASS}@cluster0.oniyx.mongodb.net/graph_social?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 5555 })
    })
    .then(res => {
        console.log(`server running at ${res.url}`)
    })