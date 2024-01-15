// 封装获取频道列表
import { useEffect, useState } from 'react'
import { getChannelApi } from '@/apis/article'

function useChannel() {
    const [channelList, getChannelList] = useState([])
    useEffect(() => {
        const getChannel = async () => {
            const res = await getChannelApi()
            getChannelList(res.data.channels)
        }
        getChannel()
    }, [])
    return { channelList }
}

export { useChannel }