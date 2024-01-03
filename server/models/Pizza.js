import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
    // The regex says that only Letters (upper or lower), Numbers, and Spaces are allowed
    validate: /^[A-Za-z0-9 ]*$/
  },
  crust: {
    type: String,
    required: true,
    // enum (Enumerator) is a choice type validation (it must be one of the following choices)
    enum: ["thin", "chicago", "deep-dish", "hella-thick"]
  },
  cheese: {
    type: String,
    validate: /^[A-Za-z0-9 ]*$/
  },
  sauce: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  toppings: [String]
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
