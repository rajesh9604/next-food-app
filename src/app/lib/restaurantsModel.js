const { default: mongoose } = require("mongoose");

const restaurantsModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  address: String,
  contact:String
});
export const restaurantsSchema =
  mongoose.models.restaurants ||
  mongoose.model("restaurants", restaurantsModel);
