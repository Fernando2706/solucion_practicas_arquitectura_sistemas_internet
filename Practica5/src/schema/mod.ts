export const typeDefs = `
    type User {
        id: String!
        username: String!
        lang: String
    }

    type Message {
        sender: String!
        received: String!
        message: String!
    }

    type Query {
        login(username:String!, password:String): String!
        getMessages(perPage:Int!, page: Int!): [Message]!
    }

    type Mutation {
        createUser(username:String!, password:String): User!
        deleteUser: User!
        sendMessage(received:String!, message:String!): Message
    }

`;