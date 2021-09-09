import "./CartItem.css";
import { Link } from "react-router-dom";
import bot from "../asserts/car.jpg"
import React from "react";

const CartItem = ({item,qtyChangeHandler,removeHandler}) => {
  return (
    <div className="cartitem">
      <div className="cartitem__image">

        <img src={item.imageUrl} alt={item.name} />
      </div>
      <Link to={`/product/${item.product}`} className="cartItem__name">
        <p>{item.name}</p>
      </Link>
      <p className="cartitem__price">${item.price}</p>
      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        className="cartItem__select"
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
        <button
            className="cartItem__deleteBtn"
            onClick={() => removeHandler(item.product)}
        >
            <i className="fas fa-trash"></i>
        </button>
    </div>

      // <div className="cartitem">
      //   <div className="cartitem__image">
      //     <img src={bot} alt="name" />
      //   </div>
      //   <Link to={`/product/${111}`} className="cartItem__name">
      //     <p>name</p>
      //   </Link>
      //   <p className="cartitem__price">price</p>
      //   <select className="cartItem__select">
      //       <option value="1">1</option>
      //       <option value="2">2</option>
      //       <option value="3">3</option>
      //   </select>
      //   <button
      //     className="cartItem__deleteBtn">
      //     <i className="fas fa-trash"></i>
      //   </button>
      // </div>
  );
};

export default CartItem;
