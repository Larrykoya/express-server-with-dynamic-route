const express = require("express");
const server = express();
const port = 4000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const products = [
  {
    id: 1,
    name: "garri",
    quantity: 100,
    price: 300,
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/07/31/20/00/little-boy-7356705__340.jpg",
  },
  {
    id: 2,
    name: "beans",
    quantity: 300,
    price: 50,
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/05/19/19/25/animal-3414131__340.jpg",
  },
  {
    id: 3,
    name: "cassava",
    quantity: 1000,
    price: 300,
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/08/17/02/23/edison-bulb-7391388__340.jpg",
  },
  {
    id: 4,
    name: "corn",
    quantity: 500,
    price: 20,
    imageUrl:
      "https://cdn.pixabay.com/photo/2019/11/14/16/01/landscape-4626489__340.jpg",
  },
  {
    id: 5,
    name: "agbado",
    quantity: 80,
    price: 200,
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
  },
];

let users = [
  {
    id: 1,
    email: "boyepanthera@gmail.com",
    firstName: "Olanrewaju",
    lastName: "Olaboye",
    password: "1234567",
  },
  {
    id: 2,
    email: "jamal@gmail.com",
    firstName: "Olajide",
    lastName: "Ibrahim",
    password: "1234567",
  },
  {
    id: 3,
    email: "dayolonge@gmail.com",
    firstName: "Oladayo",
    lastName: "Longe",
    password: "1234567",
  },
];

server.get("/", (req, res) => {
  res.send("hello world");
});
server.get("/product", (req, res) => {
  res.sendFile(__dirname + "/views/products.html");
});
server.get("/api/product/:id", (req, res) => {
  const productExist = products.find(
    (product) => product.id === Number(req.params.id)
  );
  if (productExist) {
    return res.status(200).send({ product: productExist });
  }
  return res.status(404).send({ message: "product not found" });
});
server.get("/product/:Id", (req, res) => {
  res.sendFile(__dirname + "/views/single-product.html");
});
server.get("/api/product", (req, res) => {
  res.send({ products });
});
server.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});
server.post("/api/login", (req, res) => {
  const userExist = users.find((user) => user.email === req.body.email);
  if (userExist) {
    if (userExist.password === req.body.password) {
      return res.send({ user: userExist });
    } else {
      return res.status(400).send("incorrect password");
    }
  } else {
    return res.status(404).send("you do not have an account. signup");
  }
});
server.put("/api/product/:id", (req, res) => {
  let productIndex = products.findIndex(
    (product) => product.id === Number(req.params.id)
  );

  if (products[productIndex]) {
    // console.log(products[productIndex]);
    products[productIndex] = req.body;
    // console.log(req.body);
    return res.status(200).send({ product: products });
  }
});
server.delete("/api/product/:id", (req, res) => {
  let productIndex = products.filter(
    (product) => product.id !== Number(req.params.id)
  );

  if (productIndex) {
    // console.log(productIndex);
    products = productIndex;
    return res.status(200).send({ product: products });
  }
  return res.status(400).send({ message: "product not found" });
});

server.all("*", (req, res) => {
  return res.status(400).sendFile(__dirname + "/views/error404.html");
});

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
