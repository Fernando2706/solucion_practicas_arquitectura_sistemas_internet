import Seller from "../../model/seller.ts"

export const seller_mutation = {
    Mutation: {
        addSeller: async (_, args: { dni: string, name: string }) => {
            const result = await Seller.create({
                dni: args.dni,
                name: args.name
            })

            return result.toJSON()
        },
        updateSeller: async (_, args: { id: string, idSeller: string }) => {
            const result = await Seller.findOneAndUpdate({ _id: args.idSeller }, {
                $push: {
                    cars: args.id
                }
            })

            return result?.toJSON()
        },
    }
}