export const HttPost = async (data, url, header = true) => {
    const info = data;
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*",
    };
    const options = header
        ? {
              method: "POST",
              headers: headers,
              body: JSON.stringify(info),
          }
        : {
              method: "POST",
              body: info,
          };

    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    } catch (error) {
        return (data = {
            error,
            messagge: "Error en la petición Http",
            redirect: false,
        });
    }
};
