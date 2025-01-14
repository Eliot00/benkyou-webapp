type RpcResponse<T, E = string> = {
  data: T
  success: true
} | {
  msg: E
  success: false
}

export function ok<T>(data: T): RpcResponse<T> {
  return {
    success: true,
    data,
  }
}

export function fail<E = string>(msg: E): RpcResponse<unknown, E> {
  return {
    success: false,
    msg
  }
}
