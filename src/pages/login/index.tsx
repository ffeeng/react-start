import { Button } from 'antd'
import { useEffect } from 'react'
import { userService } from '@/api/user'
export default function Login() {
  useEffect(() => {
    userService.logout()
  }, [])

  return (
    <div>
      login
      <Button type="primary">Button</Button>
    </div>
  )
}
