import React, { Component} from 'react';
import "./about.css"
import car2 from "../../../asserts/1.jpg";
import car3 from "../../../asserts/2.jpg";
import car4 from "../../../asserts/3.jpg";
import car5 from "../../../asserts/4.jpg";

class About extends Component {

    constructor(props) {
        super(props);

    }



    render() {
        return (
            <>
                <section id="infoo">
                    <h1>About Us</h1>
                        {/*<img src={car} width="100%"/>*/}

                </section>

                <section id="info">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <h3>
                                <span>3,855</span> <br/>
                                PRODUCTS
                                </h3>
                            </div>
                            <div className="col-md-3 text-center">
                                <h3>
                                    <span>150,000+</span> <br/>
                                CUSTOMERS </h3>
                            </div>
                            <div className="col-md-3 text-center">
                                <h3>
                                    <span>5 star average</span> <br/>
                                FEEDBACK </h3>
                            </div>
                            <div className="col-md-3 text-center">
                                <h3>
                                    <span>304,563</span> <br/>
                                ORDERS COMPLETE </h3>
                            </div>
                        </div>
                    </div>
                </section>

                <br/>

                <section id="story">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Our Story</h3>
                        </div>
                        <div className="col-md-6">
                            <h3>What we do</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            Gym and Fitness was founded in 2002 as a family owned and operated business.
                            The Gym and Fitness founders didn’t want it to be just another gym equipment
                            retailer - they wanted to be the best in the industry and set their minds to
                            doing so! Since its birth, Gym and Fitness has grown into one of Australia’s
                            largest online fitness equipment retailers having helped over 50,000 customers
                            live longer, happier and healthier lives
                        </div>
                        <div className="col-md-6">
                            We want to help you live a fit and healthy lifestyle! We do this by helping you
                            find the most suitable equipment for your home gym, studio or commercial gym,
                            keeping your budget, lifestyle and fitness goals in mind. We stock a wide range of
                            gym equipment, with strength equipment, cardio, cross training and so much more.
                            Our awesome team is always keen to help, so please call us to discuss your needs.
                        </div>
                    </div>
                </div>
            </section>

                <section id="aboutImg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={car2} width="100%" />
                            </div>
                            <div className="col-md-3">
                                <img src={car3} width="100%"/>
                            </div>
                            <div className="col-md-3">
                                <img src={car4} width="100%"/>
                            </div>
                            <div className="col-md-3">
                                <img src={car5} width="100%"/>
                            </div>
                        </div>
                    </div>

                </section>


                <section id="service">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Customer Service</h3>
                            </div>
                            <div className="col-md-6">
                                <h3>Culture</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                At Gym and Fitness, customers are at the centre of what we do and why we do it!
                                We have a team of knowledgeable sales representatives who are ready to assist
                                you with your gym equipment needs. Our crew will be able to answer your questions
                                from honest product information to the best way to integrate a piece of equipment
                                into your workout routine. We work hard to ensure we have strong relationships with
                                our suppliers, bringing you the best possible prices in the industry. In fact, if you
                                find a better price on one of our core range of products, we will match it as a part of
                                our brand promises.
                            </div>
                            <div className="col-md-6">
                                At Gym and Fitness, we believe that building a positive culture is incredibly important.
                                The business is underpinned by six core values which speak of our commitment to our customers,
                                staff, the industry and our business as a whole. We believe in encouraging, supporting,
                                challenging, learning and growing to be the best. At Gym and Fitness, every morsel of feedback
                                is a nugget of shiny gold because it gives us the opportunity to provide the best customer
                                experience.
                            </div>
                        </div>
                    </div>
                </section>

                <section id="core">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 text-center_new">
                                <i className="fas fa-headset"></i>
                                <h3>
                                    Customer Service
                                </h3>
                                <p>
                                    Customers are our priority. We are passionate about delivering exceptional, personalised customer service to all.
                                </p>
                            </div>
                            <div className="col-md-4 text-center_new">
                                <i className="fas fa-comments"></i>
                                <h3>
                                    Customer Service
                                </h3>
                                <p>
                                    Customers are our priority. We are passionate about delivering exceptional, personalised customer service to all.
                                </p>
                            </div>
                            <div className="col-md-4 text-center_new">
                                <i className="fas fa-users"></i>
                                <h3>
                                    Customer Service
                                </h3>
                                <p>
                                    Customers are our priority. We are passionate about delivering exceptional, personalised customer service to all.
                                </p>
                            </div>
                            <div className="col-md-4 text-center_new">
                                <i className="fas fa-tachometer-alt"></i>
                                <h3>
                                    Customer Service
                                </h3>
                                <p>
                                    Customers are our priority. We are passionate about delivering exceptional, personalised customer service to all.
                                </p>
                            </div>
                            <div className="col-md-4 text-center_new">
                                <i className="fas fa-flag"></i>
                                <h3>
                                    Customer Service
                                </h3>
                                <p>
                                    Customers are our priority. We are passionate about delivering exceptional, personalised customer service to all.
                                </p>
                            </div>
                            <div className="col-md-4 text-center_new">
                                <i className="fas fa-rocket"></i>
                                <h3>
                                    Customer Service
                                </h3>
                                <p>
                                    Customers are our priority. We are passionate about delivering exceptional, personalised customer service to all.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="touch">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9">

                            </div>
                            <div className="col-md-3">
                                <h2>Our team</h2> <br/>
                                Here at Gym and Fitness, we have a team of approximately forty awesome superstars and we owe our success to each and every one of them! Because we hire for culture first and foremost, we have some pretty awesome people working with us who hustle everyday to give you a positive customer experience. You can find them in areas such as sales, marketing and ecommerce, customer service, warehousing, finance, human resources and management. If you think you’re kind of a big deal and interested in joining our team, please send us an email with your resume and a little bit about yourself.
                                <br/><br/>
                                <button className="btn btn-outline-light">Get in Touch</button>
                            </div>
                        </div>
                    </div>
                </section>

            </>
        );

    }
}
export default About;