export const bookApiUrl = 'http://localhost:3000/projects'

export const testBookApiUrl = 'http://localhost:8081/api/projects'


export function httpGet(path) {
  return req(path)
}

export function httpGet3000(path) {
  return req3000(path)
}

export function httpPost(path, data) {
  return req(path, 'POST', data)
}

export function httpPut(path, data) {
  return req(path, 'PUT', data)
}

async function req(path, method = 'GET', data) {
  const res = await fetch(testBookApiUrl + path, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data && JSON.stringify(data)
  })
  const json = await res.json()
  return { ok: res.ok, data: json.data }
}

async function req3000(path, method = 'GET', data) {
  const res = await fetch(bookApiUrl + path, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data && JSON.stringify(data)
  })
  const json = await res.json()
  return { ok: res.ok, data: json.data }
}

