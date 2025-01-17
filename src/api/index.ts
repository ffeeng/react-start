import { message } from 'antd'
const baseUrl = 'https://chat-taichu-web-test.wair.ac.cn/'

export const fetch1 = async (
  url: string,
  init: RequestInit & { raw?: boolean } = {}
): Promise<any> => {
  if (!url.startsWith('http')) {
    url = baseUrl + url
  }
  init.headers = {
    ...init.headers,
    'Content-Type': 'application/json',
  }
  const response = await fetch(url, init)
  const res = await response.json()

  const { code, data, message: msg } = res
  if (code === 0) {
    return { data, code }
  } else if (code === 401) {
    message.error(msg)
    // useAuthStore.getState().login()
  } else {
    await message.error(msg)
    // throw new Error(msg)
  }
}
