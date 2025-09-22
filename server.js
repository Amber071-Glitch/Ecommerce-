const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/product");

const app = express();
const encodedPassword = encodeURIComponent('amber@chidokra123');
const mongoURI = `mongodb+srv://Moonknight:${encodedPassword}@cluster0.me0uy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURI).then(()=>{
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.log('Error connecting to MongoDB');
    console.log(error)
});
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("index", { products });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/products", async (req, res) => {
  const { name, price, description } = req.body;
  await Product.create({ name, price, description });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
