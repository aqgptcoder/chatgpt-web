import { ss } from '@/utils/storage'

const LOCAL_NAME = 'SECRET_TOKEN'

const LOCAL_SIGN = 'SECRET_SIGN'

export function getSign() {
  return ss.get(LOCAL_SIGN)
}

export function setSign(token: string) {
  return ss.set(LOCAL_SIGN, token)
}

export function removeSign() {
  return ss.remove(LOCAL_SIGN)
}

export function getToken() {
  return ss.get(LOCAL_NAME)
}

export function setToken(token: string) {
  return ss.set(LOCAL_NAME, token)
}

export function removeToken() {
  return ss.remove(LOCAL_NAME)
}
