const fs = require('fs')

class ProductManager {
  // Genera un ID único basado en la marca de tiempo.
  #generateUniqueId() {
    return Date.now().toString();
  }

  constructor() {
    this.path = './products.json'; // Ruta del archivo donde se guardarán los productos.
    this.products = []; // Inicializa un arreglo para almacenar los productos en memoria.
  }

  // Obtiene la lista de productos, ya sea del archivo si existe o un arreglo vacío si no existe.
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
        const productsJS = JSON.parse(productsJSON);
        return productsJS; // Devuelve el array de productos cargado desde el archivo si existe.
      }
      return []; // Devuelve un array vacío si el archivo no existe.
    } catch (error) {
      throw new Error("Error al obtener productos: " + error.message);
    }
  }

  // Agrega un producto al arreglo en memoria y lo guarda en el archivo.
  async addProduct(productData) {
    try {
      const id = this.#generateUniqueId(); // Genera un ID único para el nuevo producto.
      const newProduct = { id, ...productData };
      this.products.push(newProduct); // Agrega el nuevo producto al arreglo en memoria.
      await fs.promises.writeFile(this.path, JSON.stringify(this.products)); // Guarda la lista de productos en el archivo.
      return newProduct;
    } catch (error) {
      throw new Error("Error al agregar producto: " + error.message);
    }
  }

  // Obtiene un producto por su ID (simulando una operación asincrónica).
  async getProductById(id) {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const product = this.products.find((p) => p.id === id);
          if (!product) {
            reject(new Error("Producto no encontrado"));
          } else {
            resolve(product);
          }
        }, 1250); // Simulando una operación asincrónica (puedes reemplazar esto con tu lógica real).
      });
    } catch (error) {
      throw new Error("Error al obtener producto por ID: " + error.message);
    }
  }

  // Actualiza un producto por su ID (simulando una operación asincrónica).
  async updateProduct(id, updatedData) {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = this.products.findIndex((p) => p.id === id);
          if (index === -1) {
            reject(new Error("Producto no encontrado"));
          } else {
            this.products[index] = { ...this.products[index], ...updatedData };
            resolve(this.products[index]);
          }
        }, 1250); // Simulando una operación asincrónica.
      });
    } catch (error) {
      throw Error("Error al actualizar producto: " + error.message);
    }
  }

  // Elimina un producto por su ID (simulando una operación asincrónica).
  async deleteProduct(id) {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = this.products.findIndex((p) => p.id === id);
          if (index === -1) {
            reject(new Error("Producto no encontrado"));
          } else {
            const deletedProduct = this.products.splice(index, 1);
            resolve(deletedProduct[0]);
          }
        }, 1250); // Simulando una operación asincrónica.
      });
    } catch (error) {
      throw new Error("Error al eliminar producto: " + error.message);
    }
  }
}

const productManager = new ProductManager(); // Crea una instancia de ProductManager.

async function test() {
  
    const productData = {
    title: "JERINGA",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "ACC0701",
    stock: 25
  };

try {
    // Obtiene y muestra el array de productos (inicialmente vacío) antes de agregar uno.
    const showEmptyArray = await productManager.getProducts();
    console.log('El archivo no existe. Se genera uno vacio =>', showEmptyArray);

    // Agrega un nuevo producto.
    const addedProduct = await productManager.addProduct(productData);
    console.log("Producto agregado:", addedProduct);

    // Obtiene y muestra el producto por su ID.
    const retrievedProduct = await productManager.getProductById(addedProduct.id);
    console.log("Producto recuperado por ID:", retrievedProduct);

    // Actualiza el producto.
    const updatedProduct = await productManager.updateProduct(addedProduct.id, {
      title: 'YA NO ES JERINGA',
      description: 'Este es un producto ACTUALIZADO',      
      price: 2500,
      stock: 999
    });
    console.log("Producto actualizado:", updatedProduct);

    // Elimina el producto.
    const deletedProduct = await productManager.deleteProduct(addedProduct.id);
    console.log("Producto eliminado:", deletedProduct);
  } catch (error) {
    console.error(error.message);
  }
}

test();