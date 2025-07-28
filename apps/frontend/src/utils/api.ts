import { getRequestEvent, isServer } from 'solid-js/web'
import { getHeader } from 'vinxi/http'

export const apiPrefix: string = isServer ? import.meta.env.VITE_API_PREFIX : '/api'

export async function get(endpoint: string) {
  let url = endpoint
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
  }

  if (isServer) {
    url = `${import.meta.env.VITE_API_HOST}/${endpoint}`

    const event = getRequestEvent()
    const cookie = event ? (getHeader(event.nativeEvent, 'Cookie') || '' ) : ''

    options.headers = {
    }
  }

  const response = await fetch(url, options)
}
