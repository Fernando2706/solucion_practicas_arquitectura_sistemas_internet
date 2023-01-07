import Seller from "../../model/seller.ts";

export const Dealer = {
  Dealer: {
    id: (obj) => {
      return obj._id.toString();
    },
    sellers: async (obj) => {
      return await Seller.find({
        "_id": {
          $in: obj.sellers,
        },
      });
    },
  },
};
