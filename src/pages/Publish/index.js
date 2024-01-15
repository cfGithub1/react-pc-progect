import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'

import { useState, useEffect } from 'react'
import { createArticleApi, getArticleApi,editArticleApi } from '@/apis/article'
import { useNavigate } from 'react-router-dom'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
    // 频道列表
    const { channelList } = useChannel()

    // 切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        setImageType(+e.target.value)
    }


    // 图片上传
    const [imageList, setImageList] = useState([])
    const onUploadChange = (value) => {
        console.log(value);
        setImageList(value.fileList)
    }

    // 表单提交
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values)

        if (imageList.length !== imageType) return message.warning('封面类型和图片数量不一致')
        const { title, content, channel_id } = values
        const data = {
            title,
            content,
            cover: {
                type: imageType,
                images: imageList.map((item) => {
                    if (item.response) return item.response.data.url
                    else return item.url
                })
            },
            channel_id
        }

        if (articleId) {
           await editArticleApi({...data,id:articleId})
           message.success('修改文章成功')
        }
        else{
            await createArticleApi(data)
            message.success('发布文章成功')
        }
        navigate('/article')
    }

    // 编辑回显
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    const [form] = Form.useForm()
    console.log(articleId);
    useEffect(() => {
        const getArticle = async () => {
            const res = await getArticleApi(articleId)
            form.setFieldsValue({
                ...res.data,
                type: res.data.cover.type,
            })
            setImageType(res.data.cover.type)
            setImageList(res.data.cover.images.map(url => { return { url } }))
        }
        if (articleId) getArticle()
    }, [articleId, form])
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: `${articleId ? '编辑' : '发布'}文章` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 &&
                            <Upload
                                listType="picture-card"
                                showUploadList
                                action={'http://geek.itheima.net/v1_0/upload'}
                                name='image'
                                onChange={onUploadChange}
                                maxCount={imageType}
                                fileList={imageList}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>}

                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                {articleId?'编辑文章':'发布文章'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish