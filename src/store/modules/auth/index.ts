import { defineStore } from 'pinia'
import { getToken, removeToken, setToken, getSign, setSign, removeSign } from './helper'
import { store } from '@/store'
import { fetchSession } from '@/api'
import { getFingerprint } from '@/utils/fingerprintjs2/fingerprintjs2'

interface SessionResponse {
  auth: boolean
  model: 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI'
}

export interface AuthState {
  token: string | undefined
  sign: string | undefined
  session: SessionResponse | null
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    sign: getSign(),
    session: null,
  }),

  getters: {
    isChatGPTAPI(state): boolean {
      return state.session?.model === 'ChatGPTAPI'
    },
  },

  actions: {
    async getSession() {
      try {
        const { data } = await fetchSession<SessionResponse>()
        this.session = { ...data }
        return Promise.resolve(data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async getFingerprint() {
      const fp = await getFingerprint()
      return Promise.resolve(fp)
    },

    setSign(sign: string) {
      this.sign = sign
      setSign(sign)
    },

    removeSign() {
      this.sign = undefined
      removeSign()
    },

    setToken(token: string) {
      this.token = token
      setToken(token)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}
