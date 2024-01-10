const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const prodectModels=require('./prodectsModels')
const userschema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    balance:{
      type:Number,
      require:true,
      default:0
    },
    cart:[{
      cartitems:{
        type:mongoose.Types.ObjectId,
        ref:prodectModels
      },
      noOfItems:{
        type:Number,
        default:1
      }
    }
    ],
    history:[
      {
        id:{
          type:String
        },
        total:{
          type:Number
        },
        name:{
          type:String
        },
        date:{
          type:String
        },
        billNo:{
          type:Number
        },
        items:[
          {
            name:{
              type:String
            },
            price:{
              type:Number
            },
            noOfItems:{
              type:Number
            },
            id:{
              type:String
            }
          }
        ]
      }
    ]

  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model('user',userschema);