import express from "express"
import ProductManager from "./ProductManager.js"

const app = express()
const manager = new ProductManager("productos.json")

app.get("/", (req, res) => {
  console.log("Alguien hizo una peticion ...")
  res.send("<h1>Hola mundo!!!</h1>")
})

app.get("/products", (req, res) => {
  const limit = req.query.limit
  let productos = manager.getProducts()
  productos = productos.slice(0, limit)

  res.send({ productos: productos })
})

app.get("/products/:pid", (req, res) => {
  const id = Number(req.params.pid)
  const producto = manager.getProductById(id)
  res.send(producto ? producto : {error: "El producto no existe"})
})

app.listen(8080, () => console.log("Server up"))