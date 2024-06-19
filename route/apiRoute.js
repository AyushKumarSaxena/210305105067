const express = require('express')
const router = express.Router()

app.get('/companies/:companyname/categories/:categoryname/products?top=:n&minPrice=:mp&maxPrice=:mxp', async (req, res) => {
    const category = req.params.categoryname;
    const n = parseInt(req.query.n) || 10; // Default to 10 products
  
    try {
      const products = await productService.getProducts(category, n, req.query.sort, req.query.order);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });