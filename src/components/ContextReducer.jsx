import React, { createContext, useReducer, useContext as useReactContext } from "react";

// Contexts
const CartState = createContext();
const CartDispatch = createContext();

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const newItem = {
        ...action.item,
        totalPrice: action.item.price * action.item.quantity, 
      };
      return [...state, newItem]; 

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    
      case "DROP":
        let emptyArray=[]
        return emptyArray
    default:
      console.error("❌ Unknown action type in reducer:", action.type);
      return state;
  }
};


export const ContextReducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatch.Provider value={dispatch}>
      <CartState.Provider value={state}>{children}</CartState.Provider>
    </CartDispatch.Provider>
  );
};

export const useCartState = () => useReactContext(CartState);
export const useCartDispatch = () => useReactContext(CartDispatch);
