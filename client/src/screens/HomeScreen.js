import "./HomeScreen.css";
import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

/////////////////
// Components
// import Product from "../components/Product";

//Actions
// import { getProducts as listProducts } from "../redux/actions/productActions";
import car from "../asserts/bottle.jpg";
import CartHeader from "../Components/cartHeader";

const HomeScreen = () => {
    // const dispatch = useDispatch();
    //
    // const getProducts = useSelector((state) => state.getProducts);
    // const { products, loading, error } = getProducts;
    //
    // useEffect(() => {
    //     dispatch(listProducts());
    // }, [dispatch]);

    return (
        // <div className="homescreen">
        //     <h2 className="homescreen__title">Latest Products</h2>
        //     <div className="homescreen__products">
        //         {loading ? (
        //             <h2>Loading...</h2>
        //         ) : error ? (
        //             <h2>{error}</h2>
        //         ) : (
        //             products.map((product) => (
        //                 <Product
        //                     key={product._id}
        //                     name={product.itemName}
        //                     description={product.itemDescription}
        //                     price={product.itemAmount}
        //                     imageUrl={product.itemImage}
        //                     productId={product._id}
        //                 />
        //             ))
        //         )}
        //
        //     </div>
        // </div>

    // <div className="aa">
    //     <br/>
    //
    //     <div className="container">
    //
    //         <CartHeader/>
    //
    //
    //         <div className="row">
    //
    //             <div className="col-md-6 aa1">
    //                 <img src={car}/>
    //             </div>
    //             <div className="col-md-6 aa2">
    //                 <br/><br/><br/><br/><br/><br/><br/><br/>
    //                 <h2>WHAT'S IN YOUR CUP?</h2>
    //                 <p>Stay hydrated. Fill up with your favorite summer beverage.</p>
    //                 <a href="#" className="btn btn-primary">Add</a>
    //             </div>
    //
    //         </div>
    //         <br/><br/>
    //
    //         <div className="row">
    //
    //
    //                      {loading ? (
    //                         <h2>Loading...</h2>
    //                     ) : error ? (
    //                         <h2>{error}</h2>
    //                     ) : (
    //                         products.map((product) => (
    //                             <Product
    //                                 key={product._id}
    //                                 name={product.itemName}
    //                                 description={product.itemDescription}
    //                                 price={product.itemAmount}
    //                                 imageUrl={product.itemImage}
    //                                 productId={product._id}
    //                             />
    //                         ))
    //                     )}
    //
    //
    //
    //
    //
    //
    //
    //         </div>
    //
    //
    //     </div>
    // </div>

        <div>
            Home screen working
        </div>

    );
};

export default HomeScreen;
