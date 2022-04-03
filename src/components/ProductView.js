import React from "react";
import "./ProductView.css";

export default function ProductView(props) {
  return (
    <div className="ProductView">
      <div className="items">
        {props.product.map((product) => (
          <div className="card">
            <img src={product.image_url}></img>
            <div className="card-body">
              <div className="title"> {product.name}</div>
              <div className="price"> Price : ${product.price}</div>
              <div
                className="button"
                onClick={() => {
                  props.cart.get(product.name) === undefined
                    ? props.setCart(
                        new Map(props.cart).set(product.name, {
                          product: product,
                          quantity: 1,
                        })
                      )
                    : props.setCart(
                        new Map(props.cart).set(product.name, {
                          product: product,
                          quantity: props.cart.get(product.name).quantity + 1,
                        })
                      );
                }}
              >
                {" "}
                Add to Cart{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
