import React from "react";
import "./ProductView.css";
import { useState } from "react";

export default function ProductView(props) {
  let max_page = Math.ceil(props.product.length);
  let [page, setPage] = useState(0);

  return (
    <div className="ProductView">
      <div className="items">
        {props.product.slice(page, page + 5).map((product) => (
          <div className="card">
            <img src={product.image_url}></img>
            <div className="card-body">
              <div className="product-title"> {product.name}</div>
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

      {page !== 0 ? (
        <button
          className="page_button_prev"
          onClick={() => {
            setPage(page - 5);
          }}
        >
          Prev Page
        </button>
      ) : (
        ""
      )}

      {page < max_page - 5 ? (
        <button
          className="page_button_next"
          onClick={() => {
            setPage(page + 5);
          }}
        >
          Next Page
        </button>
      ) : (
        ""
      )}

      <div className="page_view">
        {"Page " + (page / 5 + 1) + " of " + Math.ceil(max_page / 5)}
      </div>
    </div>
  );
}
