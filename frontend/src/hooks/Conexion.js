const URLN = "http://localhost:3006/api"
export const URLBASE = "http://localhost:3006"; 

export const Listar = async (urls) => {
    const headers = {
        "Content-Type": "application/json",
    };
    const datos = await (await fetch(`${URLN}/${urls}`, {
        method: "GET",
        headers: headers,
    })).json();
    return datos;
}

export const Guardar = async (data, urls) => {

    const datos = await (await fetch(`${URLN}/${urls}`, {
        method: "POST",
        body: data,
    })).json();
    return datos;
}

export const GuardarJSON = async (data, urls) => {
    const headers = {
        "Content-Type": "application/json",
    };
    const datos = await (await fetch(`${URLN}/${urls}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers,
    })).json();
    return datos;
}

export const Eliminar = async (urls) => {

    const datos = await (await fetch(URLN + "/" + urls, {
        method: "DELETE"
    })).json();
    return datos;
}
