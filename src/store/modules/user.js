import { createSlice } from '@reduxjs/toolkit'
import { http } from '@/utils/request'
const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token:localStorage.getItem('token_react_pc') || '',
  },
  // 同步修改方法
  reducers: {
    // 获取token
    setUserInfo (state, action) {
      state.userInfo = action.payload
      // token本地持久化
      localStorage.setItem('token_react_pc', action.payload)
    }
  }
})

// 解构出actionCreater
const { setUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', loginForm)
    dispatch(setUserInfo(res.data.token))
  }
}

export { fetchLogin }

export default userReducer