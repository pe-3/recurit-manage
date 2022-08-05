import React, { useState, useEffect } from 'react'
import acat from '../../../req/requests'
import axios from 'axios'
import { message, Input, Modal, Button } from 'antd'

const inputStyle = { border: 'none', borderBottom: '1px solid rgba(0,0,0,.6)', paddingLeft: '5px', borderRadius: 'none' };
const btnStyle = { backgroundColor: '#0067b8', color: 'white', padding: '5px 33px' };
const disStyle = { backgroundColor: 'rgba(8, 103, 184,.5)', color: 'white', padding: '5px 33px' }

interface SignInProps {
    goUp: Function,
    setLogin: any,
}

const SignIn: React.FC<SignInProps> = (props) => {
    let [userid, setId] = useState('');
    let [pass, setPass] = useState('');
    let isDisabeld = !userid || !pass;
    function login() {
        acat.login({
            data: {
                userid,
                password: pass,
            }
        }).then(() => {
            let { data, code, msg } = acat.getData('login');
            if (!code) {
                let { Token } = data;

                localStorage.setItem('access_token', Token);

                axios.defaults.headers = Object.assign(axios.defaults.headers, {
                    'access_token': Token
                });

                props.setLogin(true);

            }
            message.info(msg);
        })
    }

    let [isPassEdit, setPassEdit] = useState(false);

    return (
        <div className='sign-in'>
            <div className="heading bolder_name">
                登录
            </div>
            <div className="loginDescription">
                使用你的acat账户登录以进行2022届纳新面试管理。
            </div>

            <Input placeholder='输入你的学号' className='item_input' onChange={(e) => { setId(e.target.value.trim()) }} style={inputStyle} />
            <Input placeholder='输入你的密码' className='item_input' onChange={(e) => { setPass(e.target.value.trim()) }} style={inputStyle} type='password' suffix={
                (<span className='jump-text' onClick={() => { setPassEdit(true) }}>忘记密码？</span>)
            } />
            <div className="btn-wrapper">
                <span className='jump-text' onClick={() => {
                    props.goUp();
                }}>没有账号？注册一个 </span>
                <Button type='primary' disabled={isDisabeld} style={!isDisabeld ? btnStyle : disStyle} onClick={login}>登录</Button>
            </div>
            <Modal title='找回密码' okText='确认' cancelText='取消' visible={isPassEdit} onCancel={() => {
                setPassEdit(false);
            }}>
                <div className='info-item'>
                    <span>账号</span>
                    <div>
                        <Input placeholder='输入账号' onChange={(e) => {

                        }}></Input>
                    </div>
                </div>
                <div className='info-item'>
                    <span>验证码</span>
                    <div>
                        <Input placeholder='输入验证码' onChange={(e) => {

                        }}></Input>
                    </div>
                </div>
                <div className='info-item'>
                    <span>新密码</span>
                    <div> <Input placeholder='输入新密码' onChange={(e) => {

                    }}></Input>
                    </div>
                </div>
                <div className='info-item'>
                    <span>新邮箱</span>
                    <div> <Input placeholder='输入新邮箱' onChange={(e) => {

                    }}></Input>
                    </div>
                </div>
            </Modal>
        </div>

    )
}

export default SignIn