import "./Product.css";
import { Link } from "react-router-dom";
import bottle from "../../src/asserts/car.jpg"
import car from "../asserts/bottle.jpg";
import React from "react";

const Product = ({name,description,price,imageUrl,productId}) => {

  return (
    // <div className="product">
    //   <img src={imageUrl} alt={name} />
    //
    //   <div className="product__info">
    //     <p className="info__name">{name}</p>
    //
    //
    //     <p className="info__description">{description}</p>
    //       {/*<p className="info__description">description</p>*/}
    //
    //
    //       <p className="info__price">${price}</p>
    //
    //     <Link to={`/product/${productId}`} className="info__button">
    //       View
    //     </Link>
    //
    //   </div>
    // </div>

      //
      //
      // <div className="col-md-3">
      //
      //                   <div className="card">
      //                       <img className="card-img-top" src={imageUrl}  alt="Card image cap"/>
      //                       <div className="card-body">
      //                           <h5 className="card-title">{name}</h5>
      //                           <h6 className="card-text">{description}</h6>
      //                           <hr/>
      //                           <h6 className="card-text">LKR : {price}</h6>
      //                           <hr/>
      //                                <Link to={`/product/${productId}`} className="info__button">
      //                                  View
      //                                </Link>
      //                       </div>
      //
      //               </div>
      // </div>

      //Correct one is above
      <div className="product">
        <img src={car} alt="name" />

        <div className="product__info">
          <p className="info__name">name</p>


            <p className="info__description">description</p>


            <p className="info__price">price</p>

          <Link to={`/product/${111}`} className="info__button">
            View
          </Link>

        </div>
      </div>



  );
};

export default Product;
