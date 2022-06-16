import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HttptGet } from "../services/Httpget";

export const Detail = () => {
    const { requestId = null } = useParams();
    const [sale, setSale] = useState(null);
    useEffect(() => {
        if (requestId !== null) {
            getReferencia(requestId);
        } else {
            alert("No existe la referencia");
        }
    }, [requestId]);
    const getReferencia = async (requestId) => {
        const record = await HttptGet("/api/order/", requestId);
        console.log("first", record);
        setSale({ ...record });
    };
    return (
        <div className="container-fluid">
            <h1>Detalle de la venta ref:{requestId}</h1>
            <hr />
            {sale !== null && (
                <div>
                    <p>
                        <strong>Estado de la petición:</strong> {sale.message}
                    </p>
                    <p>
                        <strong>Cliente:</strong> {sale.order.customer_name}
                        <br />
                        <strong>Correo:</strong> {sale.order.customer_email}
                        <br />
                        <strong>Celular:</strong> {sale.order.customer_mobile}
                        <br />
                        <strong>Estado(Status):</strong> {sale.order.status}
                        <br />
                    </p>
                    <a href={sale.order.url} target="_blank">
                        Revisar el pago
                    </a>
                    <br />
                    {/* {JSON.stringify(sale)} */}
                </div>
            )}
        </div>
    );
};
