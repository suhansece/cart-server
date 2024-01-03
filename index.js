const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json())
app.get("/", (req, res) => res.send("Hello"));

//router

const productRouter = require("./routes/productRoutes")

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
// Listen
