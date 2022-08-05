import { Component, ReactNode } from 'react'
import './login.css'
import SignIn from './littlePiece/signin'
import SignUp from './littlePiece/signup'

interface Props {
    setLogin: any
}

export default class Login extends Component<Props, object> {
    state: Readonly<{ isLogin: boolean }> = {
        isLogin: true,
    }
    changeState = (prop: string, val: boolean) => {
        return () => {
            this.setState({
                [prop]: val
            })
        }
    }
    render(): ReactNode {
        return (
            <div className='login'>
                <div className="loginbox shadow-box">
                    <div className="logo_pic">
                        <img src={require('../../assets/img/logo.jpeg')} alt="acat 的logo" title='acat-todo' className='logo_pic' />
                        <span className='bolder_name logo_name'>一只猫面试管理系统</span>
                    </div>
                    {this.state.isLogin ? <SignIn setLogin={this.props.setLogin} goUp={this.changeState('isLogin', false)} /> : <SignUp goIn={this.changeState('isLogin', true)} />}
                </div>
            </div>
        )
    }
}
