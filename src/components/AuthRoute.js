// 路由拦截器
import { Navigate } from 'react-router-dom'
import { message } from 'antd'

const AuthRoute = ({ children }) => {
const token = localStorage.getItem('token_react_pc')
  if (token) {
    return <>{children}</>
  } else {
    // 开严格模式会闪两次
    message.error('请先登录')
    return <Navigate to="/login" replace />
  }
}

export default AuthRoute