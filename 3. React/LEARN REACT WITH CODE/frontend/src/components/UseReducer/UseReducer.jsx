import React, { useReducer } from "react";
import products from "../../data";

const UseReducer = () => {
  const initialState = {
    cart: [],
  };

   function reducer(state, action) {
    switch (action.type) {
      case "ADD_TO_CART":
        console.log("Adding to cart", action.payload);
        return {
            ...state,
            cart: [...state.cart, action.payload],
            

        }

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <>
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>
            </li>
            <button
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }
            >
              Add to Cart
            </button>
            <hr></hr>
          </>
        ))}
      </ul>
    </div>
  );
};

export default UseReducer;
