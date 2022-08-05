import { Menu, Button, message } from 'antd'
import React, { Component, ReactNode } from 'react'
import './index.css'
import Interview from './Interview/Interview'
import ShouQuan from './ShouQuan/ShouQuan'
import Userinf from './Userinf/Userinf'
interface Props {
    setLogin: any
}
export default class Index extends Component<Props, object> {
    items = [
        {
            label: '开始面试',
            key: 'menu1',
        },
        {
            label: '授权管理',
            key: 'menu2',
        },
        {
            label: '个人信息',
            key: 'menu3',
        },
    ]
    state: Readonly<{ key: string }> = { key: 'menu1' }

    selectHandler = (props: any) => {
        let { key } = props;
        this.setState({
            key
        })
    }

    render() {
        return (
            <div className='index-page'>
                <div className="index-main shadow-box">
                    <div className="head">
                        <div className="logo">
                            <img src={require('../../assets/img/logo.jpeg')} alt="" />
                            <span className='logo-text'>一只猫面试管理</span>
                        </div>
                        <div className="menu-wrapper">
                            <Menu onSelect={this.selectHandler} mode='horizontal' items={this.items} defaultSelectedKeys={['menu1']} />
                        </div>
                        <div className="signout">
                            <Button onClick={() => {
                                this.props.setLogin(false);
                                localStorage.removeItem('access_token');
                                message.info('退出登录');
                            }}>登出</Button>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        {
                            ((): ReactNode => {
                                let resNode: ReactNode;
                                let { key } = this.state;
                                switch (key) {
                                    case 'menu1':
                                        resNode = (<Interview setLogin={this.props.setLogin} />)
                                        break;
                                    case 'menu2':
                                        resNode = (<ShouQuan />)
                                        break;
                                    case 'menu3':
                                        resNode = (<Userinf />)
                                        break;
                                    default:
                                        break;
                                }
                                return resNode;
                            })()
                        }
                    </div>
                </div>
            </div>
        )
    }
}
