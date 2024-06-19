function sortProducts(products, sort, order) {
    if (sort === 'price') {
      return products.sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
    // Add logic for other sorting criteria (e.g., rating)
    return products;
  }
  
  module.exports = sortProducts;
  