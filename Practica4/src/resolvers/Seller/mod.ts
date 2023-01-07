import Car from "../../model/car.ts";


export const Seller = {
    Seller: {
        id: (obj) => {
            return obj._id.toString()
        },
        cars: async (obj) => {
            return await Car.find({
                "_id": {
                    $in: obj.cars
                }
            })
        }
    }
}