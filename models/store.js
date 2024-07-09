const { default: mongoose } = require("mongoose");

const scheme = mongoose.Schema;

const store = new scheme({
  billNo: {
    type: Number,
    default: 0,
  },
  history: [
    {
      id: {
        type: String,
      },
      total: {
        type: Number,
      },
      name: {
        type: String,
      },
      date: {
        type: String,
      },
      billNo: {
        type: Number,
      },
      items: [
        {
          name: {
            type: String,
          },
          price: {
            type: Number,
          },
          noOfItems: {
            type: Number,
          },
          id: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("store", store);
