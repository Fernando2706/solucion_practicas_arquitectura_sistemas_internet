import Car from "../../model/car.ts"

export const car_mutation = {
    Mutation: {
        addCar: async (_,args: {plate:string, price:number}) => {
            const result = await Car.create({
                plate: args.plate,
                price: args.price
            })
            await result.save()
            return result.toJSON()
        }
    },
}