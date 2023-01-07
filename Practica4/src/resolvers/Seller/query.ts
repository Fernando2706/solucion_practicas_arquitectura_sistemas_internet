import Seller from "../../model/seller.ts"


export const seller_query = {
    Query: {
        getSeller: async (_: any, args: { id: string }) => {
            return await Seller.findById(args.id);
        },
        getSellers: async (_: any, args: { name: string }) => {
            return await Seller.find({name: args.name});
        },
    }
}