import Car from "../../model/car.ts";

export const car_query = {
  Query: {
    getCar: async (_: any, args: { id: string }) => {
      return await Car.findById(args.id);
    },
        getCars: async (_: any, args: { minPrice: number, maxPrice: number }) => {
            return await Car.find({$and: [
                {
                    price: {
                        $lte: args.maxPrice
                    },
                },
                {
                    price: {
                        $gte: args.minPrice
                    },
                },
            ]})
        },
  },
};
