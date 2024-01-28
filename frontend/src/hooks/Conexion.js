const URLN = "http://localhost:3006/api";

export const GET = async (urls, token = null) => {
  const headers = {};
  if (token) {
    headers["x-api-token"] = token;
  }
  const datos = await (
    await fetch(`${URLN}/${urls}`, {
      method: "GET",
      headers: headers,
    })
  ).json();
  return datos;
};

export const POST = async (data, urls, token = null, type = "json") => {
  const headers = {};
  switch (type) {
    case "json":
      headers["Content-Type"] = "application/json";
      data = JSON.stringify(data);
      break;
    case "form":
      var form_data = new FormData();
      for (var key in data) {
        form_data.append(key, data[key]);
      }
      data = form_data;
      break;
    default:
      break;
  }
  console.log(data);
  if (token) {
    headers["x-api-token"] = token;
  }

  const datos = await (
    await fetch(`${URLN}/${urls}`, {
      method: "POST",
      body: data,
      headers: headers,
    })
  ).json();

  return datos;
};

export const DELETE = async (urls, token = null) => {
  const headers = {};
  if (token) {
    headers["x-api-token"] = token;
  }
  const datos = await (
    await fetch(URLN + "/" + urls, {
      method: "DELETE",
      headers: headers,
    })
  ).json();
  return datos;
};
