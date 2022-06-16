export const HttptGet = async (url, data) => {
    const info = data;
    const route = url + data;
    try {
        const res = await fetch(route, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return (data = {
            error,
            status: 0,
            messagge: "Error en la petición Http",
        });
    }
};
