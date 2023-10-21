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
    const isCodeRepeated = products.some(existingProduct => existingProduct.code === product.code);
    if (isCodeRepeated) {
      console.log('Código de producto repetido!');
      return; // Detener el proceso si el código está repetido
    }
    if (!product.title || !product.description || !product.price || !product.img || !product.code || !product.stock) {
      const errorMessage = 'Error: Todos los campos son obligatorios.';
      await fs.promises.writeFile(this.path, JSON.stringify([])); // Escribir un array vacío para evitar cambios en el archivo si hay un error.
      console.log('SEGUNDA CONSULTA - AGREGO UN PRODUCTO AL ARCHIVO', await this.getProducts());
      console.log(errorMessage);
      return; // Salir del método si algún campo está faltando
    }
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
img: "https://www.google.com.ar/search?q=PRODUCTOS+DESCARTABLES+ENFERMERIA+GASA+VENDA+JERINGA+ALCOHOL+EN+GEL&tbm=isch&ved=2ahUKEwiElsfo1oeCAxWsh5UCHajBBrsQ2-cCegQIABAA&oq=PRODUCTOS+DESCARTABLES+ENFERMERIA+GASA+VENDA+JERINGA+ALCOHOL+EN+GEL&gs_lcp=CgNpbWcQAzoECCMQJ1CnCVi7cWDBeWgAcAB4AIABmAGIAfImkgEEMC4zNZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=EAw0ZYTOCqyP1sQPqIOb2As&authuser=0&bih=738&biw=1536",
code: "ACC0101",
stock: 25
};

const product2 = {
title: "GASA",
description: "Este es un producto prueba",
price: 400,
img: "https://www.google.com.ar/search?q=PRODUCTOS+DESCARTABLES+ENFERMERIA+GASA+VENDA+JERINGA+ALCOHOL+EN+GEL&tbm=isch&ved=2ahUKEwiElsfo1oeCAxWsh5UCHajBBrsQ2-cCegQIABAA&oq=PRODUCTOS+DESCARTABLES+ENFERMERIA+GASA+VENDA+JERINGA+ALCOHOL+EN+GEL&gs_lcp=CgNpbWcQAzoECCMQJ1CnCVi7cWDBeWgAcAB4AIABmAGIAfImkgEEMC4zNZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=EAw0ZYTOCqyP1sQPqIOb2As&authuser=0&bih=738&biw=1536",
code: "ACC0201",
stock: 25
};

const product3 = {
title: "VENDA",
description: "Este es un producto prueba",
price: 2500,
img: "https://www.google.com.ar/search?q=PRODUCTOS+DESCARTABLES+ENFERMERIA+GASA+VENDA+JERINGA+ALCOHOL+EN+GEL&tbm=isch&ved=2ahUKEwiElsfo1oeCAxWsh5UCHajBBrsQ2-cCegQIABAA&oq=PRODUCTOS+DESCARTABLES+ENFERMERIA+GASA+VENDA+JERINGA+ALCOHOL+EN+GEL&gs_lcp=CgNpbWcQAzoECCMQJ1CnCVi7cWDBeWgAcAB4AIABmAGIAfImkgEEMC4zNZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=EAw0ZYTOCqyP1sQPqIOb2As&authuser=0&bih=738&biw=1536",
code: "ACC0301",
stock: 25
};

const product4 = {
title: "ALCOHOL EN GEL",
description: "Este es un producto prueba",
price: 100,
img: "https://www.google.com.ar/search?q=PRODUCTOS+DESCARTABLES+ENFERMERIA+GASA+VENDA+JERINGA+ALCOHOL+EN+GEL&tbm=isch&ved=2ahUKEwiElsfo1oeCAxWsh5UCHajBBrsQ2-cCegQIABAA&oq=PRODUCTOS+DESCARTABLES+ENFERMERIA+GASA+VENDA+JERINGA+ALCOHOL+EN+GEL&gs_lcp=CgNpbWcQAzoECCMQJ1CnCVi7cWDBeWgAcAB4AIABmAGIAfImkgEEMC4zNZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=EAw0ZYTOCqyP1sQPqIOb2As&authuser=0&bih=738&biw=1536",
code: "ACC0401",
stock: 25
};
// funcion para realizar las consultas de prueba.
const test = async () => {
  console.log('PRIMER CONSULTA - MOSTRAR ARRAY VACIO', await productManager.getProducts());
  // addProduct
  console.log('SEGUNDA CONSULTA - AGREGO PRODUCTOS AL ARCHIVO');
  await productManager.addProduct(product1);
  await productManager.addProduct(product2);
  await productManager.addProduct(product3);
  await productManager.addProduct(product4);
  console.log(await productManager.getProducts());
    
  // getProductById
  const foundProduct = await productManager.getProductById(3);
  console.log('TERCERA CONSULTA - ENCONTRAR POR ID:', foundProduct);

  // updateProduct - un solo campo.
await productManager.updateProduct(2, {
  title: "PRODUCTO MODIFICADO",
  code: "NUEVO CODIGO DE ARTICULO",
  price: 1000000,
  img: "No image"
});
  console.log('CUARTA CONSULTA - MODIFICAR PRODUCTO OBTENIDO POR ID Y MOSTRAR ARRAY ACTUALIZADO: ', await productManager.getProducts());

  // deleteProduct
await productManager.deleteProduct(1);
  console.log('QUINTA CONSULTA - ELIMINAR PRODUCTO POR ID Y MOSTRAR ARRAY ACTUALIZADO:', await productManager.getProducts());
} 

test();