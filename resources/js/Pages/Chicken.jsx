import React, { useState, useEffect } from "react";
import Layout from "../GenericLayout";

const Weight = ({ active = false, title, value }) => (
    <div>
        <button className={`${active && "active"} weight`}></button>
        <p>
            <span>{title}</span>
            <span>{value}kg</span>
        </p>
    </div>
);

const Addon = ({ title, price }) => (
    <div>
        <div className="h">
            <button></button>
            <p className="n">{title}</p>
        </div>
        <p className="amt">+£{price}</p>
    </div>
);

const Tag = (props) => <span className="tag">{props.children}</span>;

const App = () => {
    useEffect(() => {
        // const handleScroll = () => {
        //     const scrollPosition = window.scrollY;
        //     if (scrollPosition > 500) {
        //         $("#hid").css("visibility", "hidden");
        //     } else {
        //         $("#hid").css("visibility", "visible");
        //     }
        // };

        // window.addEventListener("scroll", handleScroll);

        // $("#sel-1")
        //     .on("click", () => {
        //         $("#curr-img").css("backgroundImage", "url('/assets/m1.png')");
        //         $("#sel-2").removeClass("active");
        //         $("#sel-1").addClass("active");
        //     })
        //     .addClass("active");

        // $("#sel-2").on("click", () => {
        //     $("#curr-img").css("backgroundImage", "url('/assets/m3.webp')");
        //     $("#sel-1").removeClass("active");
        //     $("#sel-2").addClass("active");
        // });

        // return () => {
        //     window.removeEventListener("scroll", handleScroll);
        // };
        // Handle scroll event
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const hidElement = document.getElementById("hid");

            if (scrollPosition > 500) {
                hidElement.style.visibility = "hidden";
            } else {
                hidElement.style.visibility = "visible";
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Handle selection changes for "sel-1" and "sel-2"
        const sel1 = document.getElementById("sel-1");
        const sel2 = document.getElementById("sel-2");
        const currImg = document.getElementById("curr-img");

        // Set initial active class and background image
        sel1.classList.add("active");
        sel1.addEventListener("click", () => {
            currImg.style.backgroundImage = "url('/images/m1.png')";
            sel2.classList.remove("active");
            sel1.classList.add("active");
        });

        sel2.addEventListener("click", () => {
            currImg.style.backgroundImage = "url('/images/m3.webp')";
            sel1.classList.remove("active");
            sel2.classList.add("active");
        });

        // Cleanup scroll event listener
        // window.removeEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Layout>
            <div className="checkout-main">
                <section className="intro">
                    <div className="image-views">
                        <div id="curr-img"></div>
                        <div className="img-selector">
                            <button
                                className="i-sel active"
                                id="sel-1"
                            ></button>
                            <button className="i-sel" id="sel-2"></button>
                        </div>
                    </div>
                    <div className="details">
                        <h1 className="name poppins-semibold">
                            Herb-Roasted Whole Chicken
                        </h1>
                        <p className="sh-desc poppins-medium">
                            Golden roasted chicken with herbs and seasonal
                            vegetables. Perfectly crisp and tender.
                        </p>
                        <div className="line"></div>
                        <div className="price-hold">
                            <p className="price poppins-semibold">£13.88</p>
                            <p className="oprice poppins-medium">£19.00</p>
                        </div>
                        <div className="inf-1">
                            <div>
                                <i className="fa fa-regular fa-star"></i>
                                <span>4.6</span>
                            </div>
                            <div>
                                <i className="fas fa-shipping-fast"></i>
                                <span>60% off</span>
                            </div>
                            <div>
                                <i className="fa fa-regular fa-clock"></i>
                                <span>&lt;20mins</span>
                            </div>
                        </div>
                        <div className="tags">
                            <Tag>Roast</Tag>
                            <Tag>Top selling</Tag>
                            <Tag>Tasty</Tag>
                            <Tag>Healthy</Tag>
                        </div>
                        <div className="status">
                            <p className="stat">
                                <i className="fa fa-regular fa-check-circle"></i>{" "}
                                Available
                            </p>
                        </div>
                        <div className="action">
                            <button className="pact">
                                <i className="fa fa-heart fa-lg"></i>
                            </button>
                            <button className="pact">
                                <i className="fa fa-share fa-lg"></i>
                            </button>
                        </div>
                    </div>
                </section>
                <aside id="asd">
                    <div className="box">
                        <div className="config">
                            <div className="conf">
                                <p className="head poppins-semibold">Weight</p>
                                <div className="cont set-size">
                                    <Weight
                                        active
                                        title={"Small"}
                                        value={1.2}
                                    />
                                    <Weight title={"Medium"} value={1.6} />
                                    <Weight title={"Large"} value={2.1} />
                                </div>
                            </div>
                            <div className="conf">
                                <p className="head poppins-semibold">
                                    Toppings / add-ons
                                </p>
                                <div className="cont set-toppings">
                                    <Addon title={"Vegetables"} price={0.68} />
                                    <Addon title={"Hot Sauce"} price={0.91} />
                                </div>
                            </div>
                            <div className="conf">
                                <p className="head poppins-semibold">
                                    Special Instructions
                                </p>
                                <div className="cont sp-instructions">
                                    <textarea></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="end">
                            <div className="final">
                                <p className="fprice">£13.88</p>
                                <div className="conf-amt">
                                    <button>
                                        <i className="fa fa-minus"></i>
                                    </button>
                                    <span>1</span>
                                    <button>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button className="add">
                                <i className="fa fa-shopping-cart"></i> Add to
                                cart
                            </button>
                        </div>
                    </div>
                </aside>
                <div className="hid" id="hid">
                    <a className="add" href="#asd">
                        <i className="fa fa-shopping-cart"></i> Add to cart
                    </a>
                </div>
            </div>
        </Layout>
    );
};

export default App;
