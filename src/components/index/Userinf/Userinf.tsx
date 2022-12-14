import { Component } from 'react'
import './Userinf.css'
import { infType, transAuth } from '../ShouQuan/ShouQuan'
import { Empty, Input, message, Modal, Radio } from 'antd';
import { transGender } from '../Interview/littlePiece/funcs';
import acat from '../../../req/requests';


export default class Userinf extends Component {
    state: Readonly<{ userInf?: infType, isPassEdit: boolean, isInfEdit: boolean, isMailEdit: boolean, pass: string, newPass: string, userid: string }> = { isInfEdit: false, isMailEdit: false, pass: '', newPass: '', userid: '', isPassEdit: false }
    canRead = true
    componentDidMount() {
        if (!this.canRead) {
            return;
        }
        this.canRead = false;
        acat.getInf().then(() => {
            let { msg, code, data } = acat.getData('getInf');
            if (!code) {
                this.setState({
                    userInf: data
                })
            }
            message.info(msg);
        })
    }

    editInfo = (prop: string, val: any) => {
        this.setState({
            userInf: Object.assign(this.state.userInf as infType, { [prop]: val })
        })
    }

    editHandler = (prop: string) => {
        return (e: any) => {
            this.editInfo(prop, e.target.value);
        }
    }

    updateInf = () => {
        let { name, gender, major, phone, wish } = this.state.userInf as infType;
        acat.updateInf({
            data: {
                name,
                gender,
                major,
                phone,
                wish
            }
        }).then(() => {
            let { code, msg } = acat.getData('updateInf');
            if (!code) {
                message.success(msg);
            } else {
                message.error(msg);
            }
            this.setState({
                isInfEdit: !this.state.isInfEdit
            })
        })
    }

    updateMail = () => {
        const mailReg = /^[\w\d]{1,}@\w{1,}\.com$/;
        let { email } = this.state.userInf as infType;
        let { pass, userid } = this.state;
        if (!email || !pass) {
            return message.warn('??????????????????????????????');
        }
        if (!mailReg.test(email)) {
            return message.warn('??????????????????????');
        }

        acat.resetSignInf({
            data: {
                userid,
                password: pass,
                new_password: pass,
                newEmail: email,
            }
        }).then(() => {
            let { code, msg } = acat.getData('resetSignInf');
            if (!code) {
                message.success(msg);
                this.setState({
                    isMailEdit: false,
                })
            } else {
                message.error(msg);
            }
        })

    }

    updatePass = () => {
        let { email } = this.state.userInf as infType;
        let { pass, userid, newPass } = this.state;

        if (!pass || !userid || !newPass) {
            return message.info('???????????????');
        }

        acat.resetSignInf({
            data: {
                userid,
                password: pass,
                new_password: newPass,
                newEmail: email,
            }
        }).then(() => {
            let { code, msg } = acat.getData('resetSignInf');
            if (!code) {
                message.success(msg);
                this.setState({
                    isPassEdit: false,
                })
            } else {
                message.error(msg);
            }
        })
    }
    render() {
        let { userInf, isInfEdit, isMailEdit, isPassEdit } = this.state;
        return (
            <div className='user-inf'>
                <div className="inf-head">
                    <span className='head-title'>????????????</span>
                    <span className='info-item-edit pass-edit' onClick={() => {
                        this.setState({
                            isPassEdit: true,
                        })
                    }}> <i className="iconfont icon-key"></i> ????????????</span>
                </div>
                {userInf ? (
                    <div>
                        <div className="shadow-box info-item-wrapper">
                            <div className="info-item">
                                <div className="info-item-title">????????????</div>
                                {isInfEdit ? (<div className="info-item-edit" onClick={this.updateInf}>??????</div>) : (<div className="info-item-edit" onClick={() => {
                                    this.setState({
                                        isInfEdit: !this.state.isInfEdit,
                                    })
                                }}>??????</div>)}
                            </div>
                            <div className="info-item">
                                <div className="info-item-name">??????</div>
                                {isInfEdit ? (<div className='info-item-input'>
                                    <Input placeholder='????????????' value={userInf.name} onChange={this.editHandler('name')} />
                                </div>) : (<div className="info-item-val">{userInf.name}</div>)}
                            </div>
                            <div className="info-item">
                                <div className="info-item-name">??????</div>
                                {isInfEdit ? (<div className="info-item-input">
                                    <Radio.Group defaultValue={userInf.gender} onChange={this.editHandler('gender')}>
                                        <Radio value={true}>???</Radio>
                                        <Radio value={false}>???</Radio>
                                    </Radio.Group>
                                </div>) : <div className="info-item-val">{transGender(userInf.gender)}</div>}
                            </div>

                            <div className="info-item">
                                <div className="info-item-name">??????</div>
                                {isInfEdit ? <div>
                                    <Input placeholder='????????????' value={userInf.major} onChange={this.editHandler('major')}></Input>
                                </div> : <div className='user-item-val'>{userInf.major}</div>}
                            </div>
                            <div className="info-item">
                                <div className="info-item-name">??????</div>
                                {isInfEdit ? <div>
                                    <Input placeholder='????????????' type='number' value={userInf.phone} onChange={this.editHandler('phone')}></Input>
                                </div> : <div className="info-item-val">{userInf.phone}</div>}

                            </div>
                        </div>
                        <div className="shadow-box info-item-wrapper">
                            <div className="info-item">
                                <div className="info-item-title">????????????</div>
                                {isMailEdit ? (<div className="info-item-edit">??????</div>) : (<div className="info-item-edit" onClick={() => {
                                    this.setState({
                                        isMailEdit: !this.state.isMailEdit
                                    })
                                }}>??????</div>)}
                            </div>
                            <div className="info-item">
                                <div className="info-item-name">??????&??????</div>
                                <div className="info-item-val">{userInf.userid}</div>
                            </div>
                            <div className="info-item">
                                <div className="info-item-name">??????</div>
                                {isMailEdit ? <div>
                                    <Input placeholder='????????????' value={userInf.email} onChange={this.editHandler('email')}></Input>
                                </div> : <div className="info-item-val">{userInf.email}</div>}
                            </div>
                            <div className="info-item">
                                <div className="info-item-name">????????????</div>
                                <div className="info-item-val">{userInf.create_time}</div>
                            </div>
                        </div>
                        <div className="shadow-box info-item-wrapper">
                            <div className="info-item">
                                <div className="info-item-title">????????????</div>
                            </div>
                            <div className="info-item">
                                <div className="info-item-name">????????????</div>
                                <div className="info-item-val">{transAuth(userInf.auth)}</div>
                            </div>
                        </div>
                    </div>
                ) : (<div className='empty-wrapper'>
                    <Empty />
                </div>)}
                <Modal title='????????????' okText='??????' cancelText='??????' visible={isMailEdit} onOk={this.updateMail} onCancel={() => {
                    this.setState({
                        isMailEdit: !this.state.isMailEdit
                    })
                }}>
                    <div className='info-item'>
                        <span>??????</span>
                        <div> <Input placeholder='????????????' value={userInf ? userInf.email : ''} onChange={this.editHandler('email')}></Input>
                        </div>
                    </div>
                    <div className='info-item'>
                        <span>??????</span>
                        <div>
                            <Input placeholder='????????????' type='password' onChange={(e) => {
                                this.setState({
                                    userid: e.target.value
                                })
                            }}></Input>
                        </div>
                    </div>
                    <div className='info-item'>
                        <span>??????</span>
                        <div>
                            <Input placeholder='????????????' type='password' onChange={(e) => {
                                this.setState({
                                    pass: e.target.value
                                })
                            }}></Input>
                        </div>
                    </div>
                </Modal>
                <Modal title='????????????' okText='??????' cancelText='??????' visible={isPassEdit} onOk={this.updatePass} onCancel={() => {
                    this.setState({
                        isPassEdit: false
                    })
                }}>
                    <div className='info-item'>
                        <span>??????</span>
                        <div>
                            <Input placeholder='????????????' onChange={(e) => {
                                this.setState({
                                    userid: e.target.value
                                })
                            }}></Input>
                        </div>
                    </div>
                    <div className='info-item'>
                        <span>??????</span>
                        <div>
                            <Input placeholder='????????????' type='password' onChange={(e) => {
                                this.setState({
                                    pass: e.target.value
                                })
                            }}></Input>
                        </div>
                    </div>
                    <div className='info-item'>
                        <span>?????????</span>
                        <div> <Input placeholder='???????????????' onChange={(e) => {
                            this.setState({
                                newPass: e.target.value
                            })
                        }}></Input>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
