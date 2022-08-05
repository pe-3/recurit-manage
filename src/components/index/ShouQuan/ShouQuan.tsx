import { Button, Empty, Input, message } from 'antd'
import React, { Component } from 'react'
import acat from '../../../req/requests'
import './shou.css'
import { transGender } from '../Interview/littlePiece/funcs'
const btnStyle = { backgroundColor: '#0067b8', color: 'white', padding: '5px 33px', marginLeft: '20px' }
interface infType {
    auth: number,
    compelete: boolean,
    create_time: string,
    email: string,
    gender: true,
    is_sign: true,
    major: string,
    name: string,
    update_time: string,
    wish: number,
    phone: number,
    userid: string,
}
function transAuth(auth: number): string {
    let res: string;
    switch (auth) {
        case 1:
            res = '普通用户';
            break;
        case 2:
            res = '面试官';
            break;
        case 100:
            res = '超管';
            break;
        default:
            res = '超管';
            break;
    }
    return res;
}
export type { infType }

export { transAuth }

export default class ShouQuan extends Component {
    state: Readonly<{ userid: string, userInf?: infType }> = {
        userid: '',
    }
    setId = (val: string) => {
        this.setState({
            userid: val
        })
    }
    getInf = () => {
        let { userid } = this.state;
        if (!userid) {
            return;
        }
        acat.getOtherInf({
            params: {
                userid
            }
        }).then(() => {
            let { code, msg, data } = acat.getData('getOtherInf');
            if (!code) {
                if (!data) {
                    message.info('查无此人');
                } else {
                    this.setState({
                        userInf: data,
                    })
                }

            } else {
                message.info(msg);
            }
        })
    }
    changeAuth = () => {
        let { userid } = this.state;
        if (!userid) {
            return;
        }
        acat.changeAuth({
            params: {
                userid
            }
        }).then(() => {
            let { code, msg } = acat.getData('changeAuth');
            if (!code) {
                message.success(msg);
            } else {
                message.error(msg);
            }
        })
    }
    delInterView = () => {
        let { userid } = this.state;
        if (!userid) {
            return;
        }
        acat.delInview({
            params: {
                userid
            }
        }).then(() => {
            let { code, msg } = acat.getData('delInview');
            if (!code) {
                message.success(msg);
            } else {
                message.error(msg);
            }
        })
    }
    sign = () => {
        acat.sign().then(() => {
            let { msg, code } = acat.getData('sign');
            if (!code) {
                message.success(msg);
            } else {
                message.error(msg);
            }
        })
    }

    render() {
        let { userInf, userid } = this.state;

        return (
            <div className='ShouQuan' style={{ height: '100%', position: 'relative' }}>
                <div className="shouquan-wrapper">
                    <Input placeholder='输入被授权者id' onChange={(e) => { this.setId(e.target.value); this.setState({ userInf: undefined }) }} />
                    {userInf ? (<div style={{ display: 'flex' }}>
                        <Button onClick={this.changeAuth} style={btnStyle}>授权管理</Button>
                        <Button onClick={this.delInterView} style={{ ...btnStyle, backgroundColor: 'rgb(232, 76, 76)' }}>删除面试</Button>
                    </div>) : <Button onClick={this.getInf} style={btnStyle}>查询</Button>}
                    <Button onClick={this.sign} style={btnStyle}>签到</Button>
                </div>
                {userInf ? <div className="shouquan-inf">
                    <div className="shadow-box info-item-wrapper">
                        <div className="info-item">
                            <div className="info-item-title">
                                授权者信息
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-item-name">姓名</div>
                            <div className="info-item-val">{userInf.name}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item-name">学号</div>
                            <div className="info-item-val">{userid}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item-name">性别</div>
                            <div className="info-item-val">{transGender(userInf.gender)}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item-name">邮箱</div>
                            <div className="info-item-val">{userInf.email}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item-name">电话</div>
                            <div className="info-item-val">{userInf.phone}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item-name">权限</div>
                            <div className="info-item-val">{transAuth(userInf.auth)}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item-name">是否签到</div>
                            <div className="info-item-val">{userInf.is_sign ? '是' : '否'}</div>
                        </div>
                    </div>
                </div> : (<div className='empty-wrapper'>
                    <Empty />
                </div>)}
            </div>
        )
    }
}
