import { Layout, Menu, Popconfirm, message } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { fetchUserInfo,clearUserInfo } from '@/store/modules/user'
import { useEffect } from 'react'

const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    // 左侧tab切换二级路由
    const navigate = useNavigate()
    const onMenuClick = (route) => {
        navigate(route.key)
    }

    // 路由变化改变左侧tab选中状态
    const location = useLocation()
    const selectedKey = location.pathname

    // 用户信息初始化
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUserInfo())
    },[])
    const name = useSelector(state=>state.user.userInfo.name)

    // 退出登录
    const logout = () => {
        message.success('退出登录成功')
        dispatch(clearUserInfo())
        navigate('/login')
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{name}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={logout}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={selectedKey}
                        onClick={onMenuClick}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    {/* 二级路由出口 */}
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout