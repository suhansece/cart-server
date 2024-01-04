const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();
const cookieParser=require('cookie-parser');

app.use(express.json())
app.use(cookieParser());
app.get("/", (req, res) => res.send("Hello"));

//router

const productRouter = require("./routes/productRoutes")
const userRouter=require("./routes/userRoutes")

// Database Connection

mongoose.connect(`${process.env.DB}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`App listening  ${process.env.PORT}!`)
    );
  })
  .catch((error) => {
    console.log(error);
    console.log("Db Connection Failed");
  });

app.use('/api/product',productRouter);
app.use('/api/user',userRouter)
// Listen
