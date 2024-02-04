const express = require('express');
const connectDb = require('./config/dbCoonection');
require("dotenv").config();
const userRouter = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/users", userRouter)
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});