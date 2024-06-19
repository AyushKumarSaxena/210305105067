const dataset = require('../model/data');
const jwt = require('jsonwebtoken');

const request = require('request');
const transformProductData = require('./helpers/transformProductData');
const sortProducts = require('./helpers/sortProducts');

const ecommerceApis = {
  'AMZ': 'https://companies/AMZ/products/',
  'FLP': 'https://companies/FLP/products/',
  'SNP': 'https://companies/SNP/products/',
  'MYN': 'https://companies/MYN/products/',
  'AJO': 'https://companies/AJO/products/',
};

function makeApiRequest(url, options) {
  return new Promise((resolve, reject) => {
    request(url, options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

async function getProducts(category, n, sort, order) {
  const productPromises = [];
  for (const platform in ecommerceApis) {
    const apiUrl = `${ecommerceApis[platform]}search?q=${category}`;
    productPromises.push(makeApiRequest(apiUrl));
  }

  try {
    const allProducts = [];
    const responses = await Promise.all(productPromises);
    for (const response of responses) {
      const platformProducts = response.products.map(product => transformProductData(product, platform));
      allProducts.push(...platformProducts);
    }

    const topProducts = allProducts.slice(0, n); 
    const sortedProducts = sortProducts(topProducts, sort, order);
    return sortedProducts;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProducts,
};

