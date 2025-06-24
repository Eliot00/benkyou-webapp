import { isServer } from 'solid-js/web'

export const apiPrefix: string = isServer ? import.meta.env.VITE_API_PREFIX : '/api'
