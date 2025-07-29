import { getRequestEvent, isServer } from 'solid-js/web'
import { getHeader } from 'vinxi/http'

export async function get<T>(endpoint: string): Promise<T> {
  let url = endpoint
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
  }

  if (isServer) {
    url = `${import.meta.env.VITE_API_HOST}${endpoint}`

    const event = getRequestEvent()
    const cookie = event ? (getHeader(event.nativeEvent, 'Cookie') || '' ) : ''

    options.headers = {
      Cookie: cookie,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch(url, options)

  return await response.json<T>()
}
