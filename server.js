const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const contactRoute = require("./routes/contactRoutes");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use("/api/contacts", contactRoute);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
