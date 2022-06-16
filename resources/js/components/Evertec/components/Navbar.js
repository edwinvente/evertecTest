import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav>
            <img
                src="https://www.evertecinc.com/wp-content/uploads/2020/07/logo-evertec.png"
                alt="evertec"
                width="100%"
            />
            <ul>
                <li>
                    <Link to="/tienda">Tienda</Link>
                </li>
                <li>
                    <Link to="/tienda/checkout">Checkout</Link>
                </li>
                <li>
                    <Link to="/tienda/ordenes">Ordenes</Link>
                </li>
            </ul>
        </nav>
    );
};
