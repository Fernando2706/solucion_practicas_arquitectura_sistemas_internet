import Dealer from "../../model/dealer.ts"

export const dealer_mutation = {
    Mutation: {
        addDealer: async (_, args: {NIF:string, location:string}) => {
            const result = await Dealer.create({
                NIF: args.NIF,
                location: args.location
            })

            return result.toJSON()
        },
        updateDealer: async (_, args: { id: string, idDealer: string }) => {
            const result = await Dealer.findOneAndUpdate({_id: args.idDealer}, {
                $push: {
                    sellers: args.id
                }
            })

            return result?.toJSON()
        },
    }
}