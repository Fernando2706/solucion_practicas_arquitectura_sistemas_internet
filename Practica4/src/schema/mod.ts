export const typeDefs = `
    type Car {
        plate: String!
        price: Int!
        id: String!
    }

    type Seller {
        id: String!
        dni: String!
        name: String!
        cars: [Car]
    }

    type Dealer {
        id: String!
        location: String!
        NIF: String!
        sellers: [Seller]!
    }

    type Query {
        getCar(id: String): Car!
        getSeller(id:String): Seller!
        getDealer(id:String): Dealer!
        getCars(minPrice: Int, maxPrice: Int): [Car]!
        getSellers(name: String): [Seller]!
        getDealers(page: Int): [Dealer]!
    }

    type Mutation {
        addCar(plate: String!, price: Int!): Car!
        addSeller(name: String!, dni: String!): Seller!
        addDealer(location: String!, NIF:String!): Dealer
        updateSeller(id:String!, idSeller:String!): Seller
        updateDealer(id:String!, idDealer:String!): Dealer
    }

`;