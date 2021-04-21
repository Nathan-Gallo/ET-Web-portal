export const bookApiUrl = 'http://localhost:8081/api'


export function httpGet(path) {
  return req(path)
}

export function httpPost(path, data) {
  return doPost(data)
}

export function httpPut(path, data) {
  return req(path, 'PUT', data)
}

async function req(path, method = 'GET', data) {
  const res = await fetch(bookApiUrl + path, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const json = await res.json()
  return { ok: res.ok, data: json.data }
}


async function doPost(data) {
  const res = await fetch(bookApiUrl, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  const json = await res.json()
  result = JSON.stringify(json)
  return result;
}
