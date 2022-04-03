import minimongo from "minimongo";

export default function CartMinimongo(dbName = "CartManager") {
  const IndexedDb = minimongo.IndexedDb;

  const cart_manager = {};

  cart_manager.getProducts = function (query = {}) {
    return new Promise((resolve, reject) => {
      const db = new IndexedDb(
        { namespace: dbName },
        function () {
          db.addCollection(
            "products",
            function () {
              db.products.find(query).fetch(resolve, reject);
            },
            reject
          );
        },
        reject
      );
    });
  };

  cart_manager.createProducts = function (newProduct) {
    return new Promise((resolve, reject) => {
      const db = new IndexedDb(
        { namespace: dbName },
        function () {
          db.addCollection(
            "products",
            async function () {
              db.products.upsert(newProduct, resolve, reject);
            },
            reject
          );
        },
        reject
      );
    });
  };

  cart_manager.removeProducts = function (removeProduct = {}) {
    return new Promise((resolve, reject) => {
      const db = new IndexedDb(
        { namespace: dbName },
        function () {
          db.addCollection(
            "products",
            function () {
              db.products.remove(removeProduct, resolve, reject);
            },
            reject
          );
        },
        reject
      );
    });
  };

  return cart_manager;
}
