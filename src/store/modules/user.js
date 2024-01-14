import { createSlice } from '@reduxjs/toolkit'
import { loginApi,getProfileApi } from '@/apis/user'
const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token:localStorage.getItem('token_react_pc') || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    // 获取token
    setToken (state, action) {
      state.token = action.payload
      // token本地持久化
      localStorage.setItem('token_react_pc', action.payload)
    },
    // 获取用户信息
    setUserInfo (state, action) {
      state.userInfo = action.payload
    },
    // 退出登录
    clearUserInfo (state) {
      state.token = ''
      state.userInfo = {}
      localStorage.removeItem('token_react_pc')
    }
  }
})

// 解构出actionCreater
const { setToken,setUserInfo,clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginApi(loginForm)
    dispatch(setToken(res.data.token))
  }
}

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileApi()
    dispatch(setUserInfo(res.data))
  }
}

export { fetchLogin,fetchUserInfo,clearUserInfo }

export default userReducer