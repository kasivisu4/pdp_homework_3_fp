import "./App.css";
import ProductView from "./components/ProductView.js";
import CartView from "./components/CartView.js";
import { useState } from "react";
import { data } from "./models/Data.js";

function App() {
  let [product, setProduct] = useState(data);
  let [cart, setCart] = useState(new Map());

  return (
    <div className="App">
      <div className="flex-child magenta">
        <ProductView product={product} cart={cart} setCart={setCart} />
      </div>
      <div className="flex-child green">
        <CartView cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default App;
