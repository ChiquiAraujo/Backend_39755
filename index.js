import fs from 'fs'
import path from 'path';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;
    try {
      const data = fs.readFileSync(this.path);
      this.products = JSON.parse(data);
      this.nextId = this.getNextId();
    } catch (error) {
      console.error(`Error al leer el archivo ${this.path}: ${error}`);
    }
  }

  getNextId() {
    let maxId = 0;
    for (const product of this.products) {
      if (product.id > maxId) {
        maxId = product.id;
      }
    }
    return maxId + 1;
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data);
    } catch (error) {
      console.error(`Error al escribir en el archivo ${this.path}: ${error}`);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    // Validar que no se repita el campo "code"
    const productExists = this.products.some(product => product.code === code);
    if (productExists) {
      console.error(`El producto con código ${code} ya existe`);
      return;
    }

    const newProduct = {
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };
    this.products.push(newProduct);
    this.saveProducts(); 
    console.log("Producto añadido correctamente");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.error(`No se encontró el producto con id ${id}`);
    }
    return product;
  }

  updateProduct(id, updateData) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.error(`No se encontró el producto con id ${id}`);
      return;
    }
    const updatedProduct = { ...this.products[productIndex], ...updateData};
    this.products[productIndex] = updatedProduct;
    this.saveProducts();
    console.log(`Producto con id ${id} actualizado correctamente`);
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.error(`No se encontró el producto con id ${id}`);
      return;
    }
    this.products.splice(productIndex, 1);
    this.saveProducts();
    console.log(`Producto con id ${id} eliminado correctamente`);
  }
}

const productManager = new ProductManager("./productos.json");

productManager.addProduct(
  "iPhone 14",
  "128 GB, 5G, 6.7', Pantalla Super Retina XDR, Chip A16 Bionic, iOS",
  1599,
  "/path/to/thumbnail1.png",
  "p1",
  3);

  productManager.addProduct(
    "Samsung Galaxy S22",
    "5G, 128 GB, 8 GB RAM, 6.1'' FHD+, Exynos 2200, 3700 mAh, Android 12",
    1359,
    "/path/to/thumbnail1.png",
    "p2",
    5);
  
  productManager.addProduct(
    "Xiaomi 12T Pro",
    "256 GB, 12 GB, 6.67'', QHD, Snapdragon 8+ Gen 1, 5000 mAh, Android",
    849,
    "/path/to/thumbnail1.png",
    "p3",
    4);
  


// Actualizando un producto, pasando el ID y luego un obj con el nuevo stock
productManager.updateProduct(8, { stock: 8 });

//productManager.deleteProduct(3);

