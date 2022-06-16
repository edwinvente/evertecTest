import React, { useEffect, useState } from "react";
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

export const Checkout = () => {
    const [cart, setCart] = useState(
        window.localStorage.getItem("car")
            ? JSON.parse(window.localStorage.getItem("car"))
            : []
    );
    const [client, setClient] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let totalCart = 0;
        cart.forEach((p) => {
            totalCart += p.price;
        });
        setTotal(totalCart);
    }, [cart]);
    useEffect(() => {
        console.log("client: ", client);
    }, [client]);

    const removeItem = (e, p) => {
        e.preventDefault();
        let newcart = cart.filter((r) => r.id !== p.id);
        setCart(newcart);
        window.localStorage.setItem("car", JSON.stringify(newcart));
    };

    const createSale = (e) => {
        e.preventDefault();
        if (client.name == "" || client.email == "" || client.phone == "") {
            Toast.fire({
                icon: "error",
                title: "Debes de llenar todos los campos",
            });
            return;
        }
        if (cart.length === 0) {
            Toast.fire({
                icon: "error",
                title: "Debes tener al menos un producto en la cesta",
            });
            return;
        }
        alert("text");
    };

    return (
        <div>
            <h1>Checkout</h1>
            <hr />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {cart.length === 0 && (
                        <h4>No hay elementos en el carrito</h4>
                    )}
                    {cart.length ? (
                        cart.map((p, i) => (
                            <div
                                className="alert alert-dark d-flex justify-content-center"
                                key={i}
                            >
                                <span>
                                    {p.name} / <strong>{p.price}</strong> USD{" "}
                                    <button
                                        className="btn btn-danger ml-4"
                                        onClick={(e) => removeItem(e, p)}
                                    >
                                        X
                                    </button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <div></div>
                    )}
                    <hr />
                    <h3>Total: ${total} USD</h3>
                </div>
                <div className="col-md-6">
                    <div className="form">
                        <p>Datos personales</p>
                        <input
                            type="text"
                            name="name"
                            className="form-control my-2"
                            placeholder="Ingresa tus nombres"
                            onChange={(e) =>
                                setClient({
                                    ...client,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            value={client.name}
                        />
                        <input
                            type="email"
                            name="email"
                            className="form-control my-2"
                            placeholder="Tu correo Electronico"
                            onChange={(e) =>
                                setClient({
                                    ...client,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            value={client.email}
                        />
                        <input
                            type="phone"
                            name="phone"
                            className="form-control my-2"
                            placeholder="Regalanos tu celular"
                            onChange={(e) =>
                                setClient({
                                    ...client,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            value={client.phone}
                        />
                        {cart.length ? (
                            <input
                                type="submit"
                                className="btn btn-block btn-dark my-2"
                                value="Generar Pago"
                                onClick={(e) => createSale(e)}
                            />
                        ) : (
                            <div className="alert alert-danger mt-2">
                                Debes seleccionar al menos un producto para
                                poder generar la orden
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
