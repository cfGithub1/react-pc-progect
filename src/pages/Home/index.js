import * as echarts from 'echarts';
import { useRef, useEffect } from 'react';
import { useChannel } from '@/hooks/useChannel'

const Home = () => {
    const { channelList } = useChannel()
    const renderChannelList = channelList.map(item => {return {...item, value:1}})
    console.log(renderChannelList);
    const chartRef = useRef(null)
    useEffect(() => {
        // 获取渲染用dom节点
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        const option = {
            title: {
                text: '文章列表项',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data:renderChannelList,
                    // data: [
                    //     { value: 1048, name: 'Search Engine' },
                    //     { value: 735, name: 'Direct' },
                    //     { value: 580, name: 'Email' },
                    //     { value: 484, name: 'Union Ads' },
                    //     { value: 300, name: 'Video Ads' }
                    // ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        option && myChart.setOption(option);
    })
    return <div ref={chartRef} style={{ width: '800px', height: '800px' }}>Home</div>
}

export default Home;