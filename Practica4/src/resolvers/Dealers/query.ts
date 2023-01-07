import Dealer from "../../model/dealer.ts"


export const dealer_query = {
    Query: {
        getDealer: async (_: any, args: { id: string }) => {
            return await Dealer.findById(args.id);
        },
        getDealers: async (_: any, args: { page: number }) => {
            return await Dealer.find().limit(10).skip(10 * args.page);
        },
    }
}