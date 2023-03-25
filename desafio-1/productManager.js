class ProductManager {
  #products;

  constructor() {
    this.#products = [];
  }

  addProducts = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !stock || !code) {
      console.error("Missing parameters");
      return;
    }

    if (this.#products.find((product) => product.code === code)) {
      console.error(`The product of code: "${code}" already exists`);
      return;
    }

    let producto = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      id: this.#products.length ? this.#products[this.#products.length - 1].id + 1 : 1
    };

    this.#products.push(producto);
  }

  getProducts = () => {
    return this.#products;
  }

  getProductById = (id) => {
    let producto = this.#products.find((product) => product.id === id);

    if (!producto) {
      console.error("Not found");
    } else {
      return producto;
    }
  }
}

function main() {
  const manager = new ProductManager();

  console.log("Vacio: ", manager.getProducts());
  manager.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  console.log("Luego de agregar 1 prod: ", manager.getProducts());

  manager.addProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  console.log("Luego de agregar producto con code repetido: ", manager.getProducts());

  manager.addProducts("producto prueba", "Este es un producto prueba 2", 20, "Sin imagen", "papa frita", 25);
  console.log("Se agregar un producto con codigo diferente: ", manager.getProducts());

  console.log("Buscando id 0: ", manager.getProductById(0));
  console.log("Buscando id 1: ", manager.getProductById(1));
  console.log("Buscando id 2: ", manager.getProductById(2));
  console.log("Buscando id 3: ", manager.getProductById(3));
}

main();
