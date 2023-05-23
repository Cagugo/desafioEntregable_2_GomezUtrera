//const fs = require('fs');

import{promises as fs} from "fs"

class ProductManager {
  constructor() {
    this.patch = "./productos.txt";
    this.products = []
  }

static id = 0

 addProduct = async (title, description, thumbnail, price, code, stock) => {
  
    ProductManager.id++;
    let newProduct = {
    title,
    description,
    thumbnail,
    price,
    code,
    stock,
    id: ProductManager.id,
  };

  this.products.push(newProduct)

  await fs.writeFile(this.patch,JSON.stringify(this.products));

 };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8")
    return JSON.parse(respuesta)
  }

  getProducts = async () => {
    let respuesta2 = await this.readProducts()
    return console.log(respuesta2)

  };

  getProductsById = async (id) => {
    let respuesta3 = await this.readProducts()
    if(!respuesta3.find(product => product.id === id)){
      console.log("Producto no encontrado o no disponible")

    }else{
      console.log(respuesta3.find(product => product.id === id))
    }

    
  };

  deleteProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter(products => products.id != id)
    await fs.writeFile(this.patch,JSON.stringify(productFilter));
    console.log("Producto eliminado")
  };

  updateProducts = async ({id, ...producto}) => {
    await this.deleteProductsById(id);
    let productOld = await this.readProducts();
    let productsModif = [{ ...producto, id }, ...productOld];
    await fs.writeFile(this.patch, JSON.stringify(productsModif));


  };


}

const productos = new ProductManager();

// productos.addProduct("producto prueba", "Este es un producto prueba", "Sin imagen", 200, "abc123", 25)
// productos.addProduct("producto prueba2", "Este es un producto prueba2", "Sin imagen2", 250, "abc124", 20)
// productos.addProduct("producto prueba3", "Este es un producto prueba3", "Sin imagen3", 300, "abc125", 10)

// productos.getProducts()

// productos.getProductsById(4)

// productos.deleteProductsById(2)

productos.updateProducts({
    title: 'producto prueba3',
    description: 'Este es un producto prueba3',
    thumbnail: 'Sin imagen3',
    price: 500,
    code: 'abc125',
    stock: 10,
    id: 3
})