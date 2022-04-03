import "./App.css";
import ProductView from "./components/ProductView.js";
import CartView from "./components/CartView.js";
import { useState, useEffect } from "react";
import { data } from "./models/Data.js";
import CartMinimongo from "./models/CartMinimongo.js";

function App() {
  let [product, setProduct] = useState(data);
  let [cart, setCart] = useState(new Map());
  let Cart_Minimongo = new CartMinimongo();

  async function reloadCart() {
    let cart_in_minimongo = await Cart_Minimongo.getProducts();
    setCart(
      new Map(
        cart_in_minimongo.map((i) => [
          i[0],
          { product: i[1]["product"], quantity: i[1]["quantity"] },
        ])
      )
    );
  }

  useEffect(() => {
    reloadCart();
    return () => {};
  }, []);

  async function setCartMinimongo(data) {
    await Cart_Minimongo.removeProducts();
    await Cart_Minimongo.createProducts(Array.from(data));
    setCart(data);
  }

  return (
    <div className="App">
      <div className="title">Shopping Cart</div>
      <div className="container">
        <div className="flex-child magenta">
          <ProductView
            product={product}
            cart={cart}
            setCart={setCartMinimongo}
          />
        </div>
        <div className="flex-child green">
          <CartView cart={cart} setCart={setCartMinimongo} />
        </div>
      </div>
    </div>
  );
}

export default App;
