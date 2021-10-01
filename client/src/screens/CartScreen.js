import "./CartScreen.css";
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Components
import CartItem from "../Components/CartItem";

//Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import CartHeader from "../Components/cartHeader";


const CartScreen = () => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    // useEffect(() => {}, []);

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
    };

    const navigatePayment = (e,id) => {
        window.location = `/cartpayment/${id}`
    }


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };

    const getCartSubTotal = () => {
        return cartItems
            .reduce((price, item) => price + item.price * item.qty, 0)
            .toFixed(2);
    };

    let tot = getCartSubTotal();

    console.log("Total is : "+ tot);

    return (
        <div className="container">
            <br/>
            <CartHeader/>

            <>
                <div className="cartscreen">
                    <div className="cartscreen__left">
                        <h2>Shopping Cart</h2>
                        <hr/>

                        {cartItems.length === 0 ? (
                            <div>
                                Your Cart Is Empty <Link to="/">Go Back</Link>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <CartItem
                                    key={item.product}
                                    item={item}
                                    qtyChangeHandler={qtyChangeHandler}
                                    removeHandler={removeFromCartHandler}
                                />
                            ))
                        )}

                    </div>

                    <div className="cartscreen__right">
                        <div className="cartscreen__info">
                            <p>Subtotal ({getCartCount()}) items</p>
                            <hr/>
                            <p>Total Count :- {getCartCount()} Items </p>
                            <p>Total Price :- LKR:{getCartSubTotal()}</p>
                        </div>
                        <div>
                            <button onClick={e => navigatePayment(e,tot)}>Proceed To Checkout</button>
                        </div>
                    </div>
                </div>
            </>
        </div>

        // <Link to = {{
        //   pathname:'/conferenceUserShow',
        //   conAcceptedProps:{
        //     conferenceID: item._id
        //   }
        // }}><button className="btn btn-primary">Enter</button></Link>


        // <>
        //     <div className="cartscreen">
        //         <div className="cartscreen__left">
        //             <h2>Shopping Cart</h2>
        //
        //             {/*  {cartItems.length === 0 ? (*/}
        //             {/*    <div>*/}
        //             {/*      Your Cart Is Empty <Link to="/">Go Back</Link>*/}
        //             {/*    </div>*/}
        //             {/*  ) : (*/}
        //             {/*    cartItems.map((item) => (*/}
        //             {/*      <CartItem*/}
        //             {/*        key={item.product}*/}
        //             {/*        item={item}*/}
        //             {/*        qtyChangeHandler={qtyChangeHandler}*/}
        //             {/*        removeHandler={removeFromCartHandler}*/}
        //             {/*      />*/}
        //             {/*    ))*/}
        //             {/*  )}*/}
        //             {/</div>/}
        //
        //             {/<div className="cartscreen__right">/}
        //             {/*  <div className="cartscreen__info">*/}
        //             {/*    <p>Subtotal ({getCartCount()}) items</p>*/}
        //             {/*    <p>${getCartSubTotal()}</p>*/}
        //             {/*  </div>*/}
        //             {/*  <div>*/}
        //             {/*    <button>Proceed To Checkout</button>*/}
        //             {/*  </div>*/}
        //             {/</div>/}
        //         </div>
        //     </div>
        // </>
    );
};

export default CartScreen;