import router from '@/router'
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use((config)=> {
  // 在请求拦截器中注入token
    const token = localStorage.getItem('token_react_pc')
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, async(error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // token过期
    if(error.response.status === 401){
      localStorage.removeItem('token_react_pc')
      router.navigate('/login')
      window.location.reload();
    }
    return Promise.reject(error)
})

export { request }