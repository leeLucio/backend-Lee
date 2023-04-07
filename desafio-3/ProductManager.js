import fs from "fs"

class ProductManager {
  #path
  #writeFile = (content) =>{
    fs.writeFileSync(this.#path, JSON.stringify(content, null, "\t"))
  }

  constructor(filename) {
    this.#path = filename
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

export default ProductManager