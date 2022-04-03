import React from "react";
import "./CartView.css";

export default function CartView(props) {
  function count_total() {
    let total = 0;

    Array.from(props.cart).forEach(([name, { product, quantity }]) => {
      total += quantity * product.price;
    });

    return <div>{total}</div>;
  }

  function delete_key(name) {
    props.cart.delete(name);
    props.setCart(new Map(props.cart));
  }

  return (
    <div>
      <div className="cart-title"> Cart Details</div>
      {props.cart.size != 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity </th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(props.cart).map(([name, { product, quantity }]) => (
                <tr>
                  <td>{product.name}</td>
                  <td>
                    <button
                      className="quantity-button"
                      onClick={() => {
                        props.cart.get(name).quantity === 1
                          ? delete_key(name)
                          : props.setCart(
                              new Map(
                                props.cart.set(name, {
                                  product: product,
                                  quantity: props.cart.get(name).quantity - 1,
                                })
                              )
                            );
                      }}
                    >
                      -
                    </button>
                    {"  " + quantity}
                    <button
                      className="quantity-button"
                      onClick={() => {
                        props.setCart(
                          new Map(
                            props.cart.set(name, {
                              product: product,
                              quantity: props.cart.get(name).quantity + 1,
                            })
                          )
                        );
                      }}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </td>
                  <td>{product.price * quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">Total Price: </td>
                <td>{count_total()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>"Empty Cart"</div>
      )}
    </div>
  );
}
