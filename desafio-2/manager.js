const fs = require('fs');

class ProductManager {
  #path
  #writeFile = (content) =>{
    fs.writeFileSync(this.#path, JSON.stringify(content, null, "\t"))
  }

  constructor(filename) {
    this.#path = filename
    const products = []
    this.#writeFile(products)
  }

  addProduct = ({ title, description, price, thumbnail, code, stock }) => {
    if (!title || !description || !price || !thumbnail || !stock || !code) {
      console.error("Missing parameters")
      return
    }

    const products = this.getProducts()

    if (products.find((product) => product.code === code)) {
      console.error(`The product of code: "${code}" already exists`)
      return
    }

    let producto = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      id: products.length ? products[products.length - 1].id + 1 : 1
    }

    products.push(producto)
    this.#writeFile(products)
  }

  getProducts = () => {
    return JSON.parse(fs.readFileSync(this.#path, "utf-8"))
  }

  getProductById = (id) => {
    const products = this.getProducts()
    let product = products.find((product) => product.id === id);

    if (!product) {
      console.error("Not found")
    } else {
      return product
    }
  }

  updateProduct = (id, object) => {
    const products = this.getProducts()
    const product = products.find(prod => prod.id === id)
    if(!product){
      console.error("Not found")
      return
    }

    for (const key in object) {
      if (key) {
        product[key] = object[key]
      }
    }
    this.#writeFile(products)
  }

  deleteProduct = (id) => {
    const products = this.getProducts()
    const index = products.findIndex(prod => prod.id === id)

    index >= 0 && products.splice(index, 1)
    this.#writeFile(products)
  }
}

function tests() {
  console.log("\x1b[35mTest de creacion\x1b[0m")
  const manager = new ProductManager("productos.json")
  console.log("Clase recien creada: ", manager.getProducts())

  const ejProd = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
  }
  console.log("\x1b[35m Test addProduct vacio\x1b[0m")
  manager.addProduct(ejProd)
  console.log("1 producto agregado:", manager.getProducts())

  console.log("\x1b[35m Test addProduct code repetido\x1b[0m")
  manager.addProduct(ejProd)
  console.log("products:", manager.getProducts())

  console.log("\x1b[35m Test getProductbyID \x1b[0m")
  console.log("ID existente: ", manager.getProductById(1))
  console.log("ID no existente: ", manager.getProductById(2))

  console.log("\x1b[35m Test updateProduct \x1b[0m")
  manager.addProduct({...ejProd, code: "xyz321"})
  console.log("Arreglo inicial: ",manager.getProducts())
  manager.updateProduct(1, {price: 100, stock: 10})
  manager.updateProduct(2, {price: 99999, title: "producto prueba 2"})
  manager.updateProduct(5, {price: 100, stock: 10})
  console.log("Arreglo modificado: ",manager.getProducts())

  console.log("\x1b[35m Test deleteProduct \x1b[0m")
  manager.deleteProduct(1)
  manager.deleteProduct(2)
  console.log(manager.getProducts()) 
}

tests()