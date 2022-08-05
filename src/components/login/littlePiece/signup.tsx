import React, { useState, useEffect } from 'react'
import acat from '../../../req/requests'
import { message, Input, Modal, Button } from 'antd'

const inputStyle = { border: 'none', borderBottom: '1px solid rgba(0,0,0,.6)', paddingLeft: '5px', borderRadius: 'none' };
const btnStyle = { backgroundColor: '#0067b8', color: 'white', padding: '5px 33px' };
const disStyle = { backgroundColor: 'rgba(8, 103, 184,.5)', color: 'white', padding: '5px 33px' }
const mailBtnStyle = { marginLeft: '10px', backgroundColor: '#0867b8', color: 'white' };
const mailDisStyle = { marginLeft: '10px', backgroundColor: 'rgba(8, 103, 184,.5)', color: 'white' };

interface SignUpProps {
    goIn: Function
}


const SignUp: React.FC<SignUpProps> = (props) => {

    let [email, setMail] = useState('');
    let [code, setCode] = useState('');
    let [userid, setId] = useState('');
    let [password, setPass] = useState('');
    let timer: any;

    let [codeCount, setCodeCount] = useState(60);
    let [canClickSign, setSignClick] = useState(true);
    let isDisabled = !email || !code || !userid || !password || !canClickSign;
    let [canClickMail, setClick] = useState(true);

    function sendCode() {
        if (!canClickMail) {
            return;
        }
        setClick(false);

        let mailTest = /^[\w\d]{1,}@[a-zA-Z]{1,}\.com$/;
        console.log(mailTest.test(email))
        if (!mailTest.test(email)) {
            return message.info('邮箱格式错误🙅');
        }
        acat.sendVeriCode({
            data: {
                action: '注册',
                email,
            }
        }).then(() => {
            let { code, msg, data } = acat.getData('sendVeriCode');
            if (!code) {
                timer = setInterval(() => {
                    console.log(codeCount);
                    if (codeCount <= 0) {
                        setCodeCount(60);
                        setClick(true);
                        return clearInterval(timer);
                    }
                    codeCount--;
                    setCodeCount(codeCount);
                }, 1000);
            }
            message.info(msg);
        })
    }
    function signup() {

        setSignClick(false);

        acat.signup({
            data: {
                password,
                email,
                verifyCode: code,
                userid,
            }
        }).then(() => {
            let { msg } = acat.getData('signup');

            message.info(msg);
            setTimeout(() => {
                setSignClick(true);
            }, 500);
        }, () => {
            setSignClick(true);
        })
    }

    return (
        <div className='sign-in'>
            <div className="heading bolder_name">
                注册
            </div>
            <div className="loginDescription">
                使用你的acat账户注册以进行2022届纳新面试管理。
            </div>
            <Input placeholder='设置账号' className='item_input' style={inputStyle} onChange={(e) => { setId(e.target.value.trim()) }} />
            <Input placeholder='设置你的密码' className='item_input' style={inputStyle} onChange={(e) => { setPass(e.target.value.trim()) }} />

            <div className='mail-send'>
                <Input placeholder='输入你的邮箱' className='item_input' style={inputStyle} onChange={(e) => { setMail(e.target.value.trim()) }} />
                <Button onClick={sendCode} disabled={codeCount !== 60 || !email || !canClickMail} style={codeCount === 60 && email && canClickMail ? mailBtnStyle : mailDisStyle}>{codeCount !== 60 ? `(已发送)${codeCount}s` : '发送验证'}</Button>
            </div>
            <Input placeholder='输入你的验证码' className='item_input' style={inputStyle} onChange={(e) => { setCode(e.target.value.trim()) }} />
            <div className="btn-wrapper">
                <span className='jump-text' onClick={() => {
                    props.goIn();
                }}>已有账号？去登录</span>
                <Button onClick={signup} disabled={isDisabled} style={!isDisabled ? btnStyle : disStyle} >注册</Button>
            </div>
        </div>
    )
}

export default SignUp