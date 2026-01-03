const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
//اضافه شدن این خط برای عکس دار کردن
app.use("/images",
express.static("images"));     

// 👇 آرایه محصولات (فقط اینجا)
const products = [
  {
    id: 1,
    name: "Xbox Series X",
    price: 45000000,
    image: "photo_2025-12-31_21-50-05.jpg"
  },
  {
    id: 2,
    name: "SSD 1TB",
    price: 12000000,
    image: "hard-1.jpg"
  },
  {
    id: 3,
    name:"هارد hdd",
    price: 10000000,
    image: "photo_2026-01-01_22-47-41 هارد1.jpg"
  }
];

// 👇 API محصولات
app.get("/api/products", (req, res) => {
  res.json(products);
});

// 👇 اجرای سرور
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});