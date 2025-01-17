import { fetch1 } from '@/api/index'
export const userService = {
  async login() {
    return fetch1('', {
      method: 'POST',
      body: JSON.stringify({
        username: '15271854275',
        password: '123',
      }),
    })
  },
  async logout() {
    return fetch1('zdtc-api/logout', {
      method: 'POST',
    })
  },
}
