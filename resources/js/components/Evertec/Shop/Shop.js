import React, { useEffect, useState } from "react";
import { products } from "../Data/Data";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export const Shop = () => {
    const [cart, setCart] = useState(
        window.localStorage.getItem("car")
            ? JSON.parse(window.localStorage.getItem("car"))
            : []
    );
    const addCart = (e, p) => {
        e.preventDefault();
        if (!cart.find((r) => r.id === p.id)) setCart([...cart, p]);
        if (!cart.find((r) => r.id === p.id))
            Toast.fire({
                icon: "success",
                title: "Agregado al carrito",
            });
        if (cart.find((r) => r.id === p.id))
            Toast.fire({
                icon: "info",
                title: "Ya esta en la cesta",
            });
    };

    useEffect(() => {
        if (cart.length)
            window.localStorage.setItem("car", JSON.stringify(cart));
    }, [cart]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8">
                            <h1>Tienda</h1>
                            <p>Venta de paquetes de asesorías</p>
                        </div>
                        <div className="col-md-4">
                            <span>🛒({cart.length})</span>
                            <span className="ml-1">checkout</span>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        {products.map((p, i) => {
                            return (
                                <div className="col-md-4 mb-4" key={i}>
                                    <div className="img">
                                        <img
                                            src={p.path}
                                            alt="img"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="text mt-2">
                                        <h4>
                                            <strong>{p.name}</strong>
                                        </h4>
                                        <p>{p.description}</p>
                                        <div className="d-flex d-flex justify-content-start align-items-center">
                                            <strong className="mr-4 price">
                                                {p.price}/USD
                                            </strong>
                                            <button
                                                className="btn btn-dark btn-sm btn-block"
                                                onClick={(e) => addCart(e, p)}
                                            >
                                                Agregar al carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
