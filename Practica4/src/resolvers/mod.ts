import { deepMerge } from "https://deno.land/std/collections/mod.ts";
import {car_query} from "./Cars/query.ts"
import { car_mutation } from "./Cars/mutation.ts"

import { seller_query } from "./Seller/query.ts"
import { seller_mutation } from "./Seller/mutation.ts"

import { dealer_query} from "./Dealers/query.ts"
import { dealer_mutation } from "./Dealers/mutation.ts"

import { Car } from "./Cars/mod.ts"
import { Dealer } from "./Dealers/mod.ts"
import { Seller } from "./Seller/mod.ts"


const query = deepMerge(car_query, seller_query)
const mutation = deepMerge(car_mutation, seller_mutation)

const resolvers = {
    Query: deepMerge(query,dealer_query).Query,
    Mutation: deepMerge(mutation, dealer_mutation).Mutation,
    Car: Car.Car,
    Dealer: Dealer.Dealer,
    Seller: Seller.Seller
}

export default resolvers