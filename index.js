class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
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
      console.log("Producto añadido correctamente");
    }
  
    //Renderizar los productos
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        console.error("Not found");
      }
      return product;
    }
  }
  
  const productManager = new ProductManager();

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

//console.log(productManager.getProducts());

const productById = productManager.getProductById(4);
console.log(productById);

 const nonexistentProduct = productManager.getProductById(2);
 console.log(nonexistentProduct);
