import mongoose from "mongoose"
import { dotEnvConfig } from './deps.ts';

import {ApolloServer} from "apollo"
import { startStandaloneServer } from "apollo-server"

import resolvers  from "./resolvers/mod.ts" 

import {typeDefs} from "./schema/mod.ts"

dotEnvConfig({ export: true });


if (!Deno.env.get("MONGO_URL") || !Deno.env.get("PORT")) {
    console.error("You must set a url to mongo and a port in the .env file.")
    Deno.exit()
}

try {
    await mongoose.connect(Deno.env.get("MONGO_URL") as string);
} catch (_) {
    console.error("Cannot connect to mongo")
    Deno.exit()
}


const server = new ApolloServer({
    typeDefs,
    resolvers, 
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
    context: ({req}) => ({
        auth: req.headers.auth || "",
        lang: req.headers.lang || "es",
    })
});

console.log(`Server running on: ${url}`);