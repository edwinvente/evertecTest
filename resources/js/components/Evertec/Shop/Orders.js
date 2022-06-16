import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HttPost } from "../services/HttpPost";
import { useDebounce } from "use-debounce";

export const Orders = () => {
    const [orders, setorders] = useState(null);
    const [text, setText] = useState("");
    const [errormail, seterrormail] = useState(true);
    const [value] = useDebounce(text, 1000);
    useEffect(() => {
        if (text.length > 3) {
            const validate = emailValidation(text);
            if (validate) {
                getOrders(text);
                seterrormail(true);
            } else {
                seterrormail(false);
            }
        }
    }, [value]);
    //llamo todas las ordenes
    const getOrders = async (email) => {
        const { response = null } = await HttPost({ email }, "/api/orders");
        console.log("orders: ", response);
        if (response) setorders(response);
    };
    const emailValidation = (email) => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || regex.test(email) === false) return false;
        return true;
    };

    return (
        <div>
            <h1>Busca tus ordenes</h1>
            <hr />
            <div className="row">
                <div className="col-md-6">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Ingresa tu email"
                        defaultValue={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    {!errormail && (
                        <div className="alert alert-danger mt-2">
                            Ingresa un email valido
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    {!orders && <h3>No hay ordenes disponibles</h3>}
                    {orders &&
                        orders.map((o, i) => {
                            return (
                                <div className="alert alert-dark" key={i}>
                                    <p>
                                        Request: {o.requestId} - Valor:{" "}
                                        {o.amount} USD{" "}
                                        <Link
                                            to={`/tienda/detalle/${o.requestId}`}
                                        >
                                            Ver referencia pago
                                        </Link>
                                        <a href={o.url}>revisar pago</a>
                                    </p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
