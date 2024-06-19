function transformProductData(data, platform) {
    return {
        id: generateUniqueId(), // Generate a unique ID for each product (implement in a separate helper)
        platform,
        name: data.name || 'Product Name',
        price: data.price || 0,
    };
}
  
module.exports = transformProductData;
  