const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const prodectSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      default:0
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", prodectSchema);
