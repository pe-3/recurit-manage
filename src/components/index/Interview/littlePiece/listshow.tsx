import { Button, Input, message, Pagination, Popconfirm, Radio, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import acat from '../../../../req/requests';
import { wishMapper } from './funcs';
import { Props } from './funcs';

const btnStyle = { backgroundColor: '#0067b8', color: 'white', padding: '5px 33px', marginLeft: '20px' }

const ListShow: React.FC<Props> = (props) => {
    interface listItem {
        name?: string,
        wish?: number,
        userid?: string,
    }
    let [list, setList] = useState([] as listItem[]);

    //接口变量
    let similarName = '';

    let isDesc = true;

    let wish = 0;

    let page = 1;
    let [limit, setLimit] = useState(5);

    let timer: any;

    let [listSize, setSize] = useState(200);

    function getList(isAlert?: boolean) {
        acat.queryInview({
            data: {
                similarName: similarName ? similarName : null,
                fields: [
                    {
                        field: 'userid',
                        isDesc
                    }
                ],
                wish: wish === 0 ? null : wish,
                page,
                limit,
            }
        }).then(() => {
            let { code, msg, data } = acat.getData('queryInview');
            if (!code) {
                console.log(data)
                setList(data.info);
                setSize(data.listSize);
            } else {
                // message.info('登录过期，重新登录');
                props.setLogin(false);
                localStorage.removeItem('access_token');
            }
            if (!isAlert) {
                message.info(msg);
            }
        })
    }

    let canSend = true;

    useEffect(() => {
        if (!canSend) {
            return;
        }
        canSend = false;
        getList();
    }, [])

    return (
        <div className='list-show'>
            <h3 className='head-title'>面试列表</h3>
            <div className="userid-input">
                <Input placeholder='搜索面试者' onChange={(e) => {
                    similarName = e.target.value;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        getList();
                    }, 300);
                }} />
                <Button style={btnStyle}>
                    <i className="iconfont icon-sousuo"></i>
                </Button>
            </div>
            <div className="radio-item">
                <span className='input-text'>组别</span>
                <Radio.Group defaultValue={0} onChange={(e) => {
                    wish = e.target.value;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        getList();
                    }, 1000);
                }}>
                    <Radio value={0}>
                        {wishMapper(0)}
                    </Radio>
                    <Radio value={1}>
                        {wishMapper(1)}
                    </Radio>
                    <Radio value={2}>
                        {wishMapper(2)}
                    </Radio>
                    <Radio value={3}>
                        {wishMapper(3)}
                    </Radio>
                    <Radio value={4}>
                        {wishMapper(4)}
                    </Radio>
                </Radio.Group>
            </div>
            <div className="list-wrapper">
                <div className="list-head">
                    <span>姓名  </span>
                    <span className='userid'>学号 <i className="iconfont icon-shengxu"></i></span>
                    <span >意愿组别</span>
                    <span style={{ textAlign: 'center' }}>取消签到</span>
                    <span style={{ textAlign: 'center' }}>面试</span>
                </div>
                {
                    list.map((val, i) => {
                        return (
                            <Tooltip title='点击查看信息' key={i} placement='right'>
                                <div className="list-item" onClick={() => {
                                    props.jumpInfo(val);
                                }}>
                                    <span>{val.name}</span>
                                    <span className='userid'>{val.userid}</span>
                                    <span>{wishMapper(val.wish)}</span>


                                    <div style={{ textAlign: 'center' }}>
                                        <Popconfirm title={`确定要取消${val.name}的签到吗？`} okText='是' onCancel={(e) => { e?.stopPropagation() }} cancelText='否' onConfirm={(e) => {
                                            e?.stopPropagation();
                                            acat.unsetsign({
                                                params: {
                                                    userid: val.userid,
                                                }
                                            }).then(() => {
                                                let { code, msg } = acat.getData('unsetsign');
                                                if (!code) {

                                                }
                                                message.info(msg);
                                            })
                                        }} >
                                            <i className="iconfont icon-quxiaodingdanxiao" onClick={(e) => { e.stopPropagation() }}></i>
                                        </Popconfirm>

                                    </div>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        props.jumpInfo(val, 'evaluate');
                                    }}>开始面试</Button>
                                </div>
                            </Tooltip>
                        )
                    })
                }
            </div>
            <div className="pagi-wrapper">
                <Pagination total={listSize} defaultCurrent={1} pageSize={limit} pageSizeOptions={[5, 10]} onChange={(p, pageSize) => {
                    page = p;
                    setLimit(pageSize);
                    setTimeout(() => {
                        getList();
                    });
                }} />
            </div>
        </div>
    )
}

export default ListShow