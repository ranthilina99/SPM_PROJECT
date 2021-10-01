import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartHeader = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <h2>Store</h2>
            </div>
            <ul className="navbar__links">
                <li>
                    <Link to="/cart" className="cart__link">
                        <i className="fas fa-shopping-cart"></i>
                        <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
                    </Link>
                </li>
                <li>
                    <Link to="/homeStore">Store</Link>
                </li>
            </ul>


        </nav>
    );
};

export default CartHeader;
