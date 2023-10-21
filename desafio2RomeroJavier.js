const fs = require('fs');

class ProductManager {
  constructor() {
    this.path = './products.json';
    this.nextId = 1; // Variable para almacenar el próximo ID autoincrementable.
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
        const productsJS = JSON.parse(productsJSON);
        return productsJS;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      product.id = this.nextId; // Asigno el ID autoincrementable al producto.
      this.nextId++; // Incremento el valor del próximo ID.
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  // Obtiene un producto por su ID.
async getProductById(idProduct) {
  try {
    const products = await this.getProducts(); // Almaceno los productos en una variable para desp usar find y retornar el objeto.
  const showProduct = products.find(product => product.id === idProduct);
  return showProduct;
  } catch (error) {
    console.log(error)
  } // En lugar de mostrarlo por consola, devuelve el producto encontrado.
}
// Actualiza un producto por su ID.
async updateProduct(idProduct, fieldsToUpdate) {
  try {
    const products = await this.getProducts();
    const productIndex = products.findIndex(product => product.id === idProduct);
    if (productIndex !== -1) {
      const productToUpdate = products[productIndex];
      for (const field in fieldsToUpdate) {
        if (productToUpdate.hasOwnProperty(field)) {
          productToUpdate[field] = fieldsToUpdate[field];
        }
      }
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      await this.getProducts(); 
    } else {
      console.log(`No se encontró ningún producto con el ID ${idProduct}`);
    }
  } catch (error) {
    console.log(error);
  }
}

  // Elimina un producto por su ID .
    async deleteProduct(idProduct) {
    try {
      const products = await this.getProducts();
      const updatedProducts = products.filter(product => product.id !== idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
    } catch (error) {
      console.log(error);
    }
  }
}

const productManager = new ProductManager(); // Crea una instancia de ProductManager.

const product1 = {
title: "JERINGA",
description: "Este es un producto prueba",
price: 200,
thumbnail: "Sin imagen",
code: "ACC0101",
stock: 25
};

const product2 = {
title: "GASA",
description: "Este es un producto prueba",
price: 400,
thumbnail: "Sin imagen",
code: "ACC0201",
stock: 25
};

const product3 = {
title: "VENDA",
description: "Este es un producto prueba",
price: 2500,
thumbnail: "Sin imagen",
code: "ACC0301",
stock: 25
};

const product4 = {
title: "ALCOHOL EN GEL",
description: "Este es un producto prueba",
price: 100,
thumbnail: "Sin imagen",
code: "ACC0401",
stock: 25
};
// funcion para realizar las consultas de prueba.
const test = async () => {
  console.log('PRIMER CONSULTA - MOSTRAR ARRAY VACIO', await productManager.getProducts());
  // addProduct
  await productManager.addProduct(product1);
  console.log('SEGUNDA CONSULTA - AGREGO UN PRODUCTO AL ARCHIVO', await productManager.getProducts());
  await productManager.addProduct(product2);
  console.log('TERCER CONSULTA - AGREGO DOS MAS', await productManager.getProducts());
  await productManager.addProduct(product3);
  await productManager.addProduct(product4);
  
  // getProductById
  const foundProduct = await productManager.getProductById(3);
  console.log('CUARTA CONSULTA - ENCONTRAR POR ID:', foundProduct);

  // updateProduct - un solo campo.
await productManager.updateProduct(4, {
  title: "PRODUCTO MODIFICADO",
  code: "NUEVO CODIGO DE ARTICULO",
  price: 1000000
});
  console.log('QUINTA CONSULTA - MODIFICAR PRODUCTO OBTENIDO POR ID Y MOSTRAR ARRAY ACTUALIZADO: ', await productManager.getProducts());

  // deleteProduct
await productManager.deleteProduct(3);
  console.log('SEXTA CONSULTA - ELIMINAR PRODUCTO POR ID Y MOSTRAR ARRAY ACTUALIZADO:', await productManager.getProducts());
} 

test();