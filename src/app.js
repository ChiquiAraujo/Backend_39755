import express from 'express';
import ProductManager from './productManager.js';
const productManager = new ProductManager("./productos/productos.json");
const products = productManager.getProducts();

const port = 3950;
const app = express();




app.get('/productos/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const limitedProducts = limit ? products.slice(0, limit) : products;
    res.json(limitedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error obteniendo productos');
  }
});

app.get('/productos:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await ProductManager.getProductById(productId);
    if (!productId) {
      res.status(404).send('Producto no encontrado');
      return;
    }
    res.json(product);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error obteniendo producto');
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
