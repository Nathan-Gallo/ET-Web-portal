export const projectApiUrl = 'http://localhost:8081/api'


export function httpGet(path) {
  return req(path);
}

export async function httpPost(path, data) {
  return req(path, "POST", data);  
}

export function httpPut(path, data) {
  return req(path, 'PUT', data)
}

async function req(path, method = 'GET', data) {
  const res = await fetch(projectApiUrl + path, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  const json = await res.json()
  let rawResult = JSON.stringify(json);
  let result = JSON.parse(rawResult);

  return result
}

