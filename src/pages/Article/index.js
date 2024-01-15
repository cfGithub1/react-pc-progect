import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'

import { Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'

import { useChannel } from '@/hooks/useChannel'
import { getArticleListApi,delArticleApi } from '@/apis/article'
import { useEffect, useState } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    // 频道列表
    const { channelList } = useChannel()

    // 表格数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => data === 1 ? <Tag color="warning">待审核</Tag> : <Tag color="success">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Popconfirm
                            title="删除文章"
                            description="确认要删除当前文章吗?"
                            onConfirm={()=>onDelete(data)}
                            okText="是"
                            cancelText="否"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    // 筛选功能
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 10
    })
    const onFinish = (values) => {
        console.log(values);
        setReqData({
            ...reqData,
            status: values.status,
            channel_id: values.channel_id,
            begin_pubdate: values.date[0].format('YYYY-MM-DD'),
            end_pubdate: values.date[1].format('YYYY-MM-DD'),
        })
    }

    // 获取文章列表
    const [articleList, setArticleList] = useState([]);
    const [count, setCount] = useState()
    useEffect(() => {
        const getArticleList = async () => {
            const res = await getArticleListApi(reqData);
            setArticleList(res.data.results)
            setCount(res.data.total_count)
        }
        getArticleList();
    }, [reqData])

    // 分页器
    const onPageChange = (page, pageSize) => {
        setReqData({
            ...reqData,
            page,
            per_page: pageSize
        })
    }
    const paginationProps = {
        total: count,
        pageSize: reqData.per_page,
        pageSizeOptions: [5, 10, 15, 20],
        showQuickJumper: true,
        onChange: onPageChange
    }

    // 删除功能
    const onDelete = async(data) => {
        await delArticleApi(data.id)
        setReqData({
            ...reqData
        })
    }

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择频道"
                            style={{ width: 120 }}
                        >
                            {channelList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={articleList} pagination={paginationProps} />
            </Card>
        </div>
    )
}

export default Article