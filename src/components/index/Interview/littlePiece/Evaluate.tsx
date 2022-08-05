import { Button, Input, message, Radio, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import acat from '../../../../req/requests';
import { infoProps } from './funcs';
import { btnStyle } from './funcs';
import { transPass, passTrans } from './funcs';

const { Option } = Select;
const { TextArea } = Input;


const Evaluate: React.FC<infoProps> = (props) => {


    let isFirstFinish: boolean = false;
    let { first_ability, first_attitude, first_interview, first_interviewer, first_remarks, first_ispass } = props.infoData;
    if (first_ability && first_attitude && first_interview && first_interviewer && first_remarks && first_ispass) {
        isFirstFinish = true;
    }

    let isSecondFinish: boolean = false;
    let { second_ability, second_attitude, second_interview, second_interviewer, second_remarks, second_ispass } = props.infoData;
    if (second_ability && second_attitude && second_interview && second_interviewer && second_remarks && second_ispass) {
        isSecondFinish = true;
    }

    let isThirdFinish: boolean = false;
    let { third_ability, third_attitude, third_interview, third_interviewer, third_remarks, third_ispass } = props.infoData;
    if (third_ability && third_attitude && third_interview && third_interviewer && third_remarks && third_ispass) {
        isThirdFinish = true;
    }
    let [final_ispass, setFinal] = useState(props.infoData.final_ispass);

    let userid = props.infoData.userid, name = props.infoData.name;

    //初始化表单值
    let [interRounds, setRounds] = useState(1);
    let [ability, setAbility] = useState(first_ability);
    let [attitude, setAttitude] = useState(first_attitude);
    let [interview, setInterview] = useState(first_interview);
    let [remarks, setRemark] = useState(first_remarks);
    let [isPass, setPass] = useState(first_ispass);
    let [viewer, setViewer] = useState(first_interviewer);

    let canChange = true;

    useEffect(() => {
        if (!canChange) {
            return;
        }
        canChange = false;
        if (isFirstFinish) {
            if (isSecondFinish) {
                setRound(3);
            } else {
                setRound(2);
            }
        }
    }, [])

    function setRound(rounds: number) {
        switch (rounds) {
            case 1:
                setRounds(1);
                setAbility(first_ability);
                setAttitude(first_attitude);
                setInterview(first_interview);
                setRemark(first_remarks);
                setPass(first_ispass);
                setViewer(first_interviewer);
                break;
            case 2:
                setRounds(2);
                setAbility(second_ability);
                setAttitude(second_attitude);
                setInterview(second_interview);
                setRemark(second_remarks);
                setPass(second_ispass);
                setViewer(second_interviewer);
                break;
            case 3:
                setRounds(3);
                setAbility(third_ability);
                setAttitude(third_attitude);
                setInterview(third_interview);
                setRemark(third_remarks);
                setPass(third_ispass);
                setViewer(third_interviewer);
                break;
            default:
                break;
        }
    }


    const submit = () => {
        acat.evaluate({
            data: {
                userid,
                times: interRounds,
                interview,
                attitude,
                ability,
                remarks,
                ispass: isPass,
                interviewer: viewer,
                final_ispass,
            }
        }).then(() => {
            let { msg, code } = acat.getData('evaluate');
            if (!code) {
                return message.success(msg);
            }
            message.error(msg);
        })
    }

    const changeHandler = (func: any, tans?: any) => {
        if (tans) {
            return (e: any) => {
                func(tans(e.target.value))
            }
        }
        return (e: any) => {
            func(e.target.value)
        }
    }

    return (
        <div className='evaluate'>
            <div className="input-wrapper">
                <h3 className='head-title'>评价</h3>
                <div className="input-item">
                    <div >面试者</div>
                    <div className="info-item-val">{name}</div>
                </div>
                <div className="input-item">
                    <div >面试者学号</div>
                    <div className="info-item-val">{userid}</div>
                </div>
                <div className='input-item'>
                    <span>面试轮次</span>
                    <Select style={{ width: 120 }} value={interRounds} onChange={(val) => { setRound(val) }} >
                        <Option value={1}>第一轮</Option>
                        <Option value={2}>第二轮</Option>
                        <Option value={3}>第三轮</Option>
                    </Select>
                </div>
                <div className="input-item">
                    <span className='input-text'>态度打分</span>
                    <Input placeholder='请输入分数' type='number' onChange={changeHandler(setAttitude)} value={attitude} maxLength={2} />
                </div>
                <div className="input-item">
                    <span className='input-text'>能力打分</span>
                    <Input placeholder='请输入分数' type='number' onChange={changeHandler(setAbility)} value={ability} maxLength={2} />
                </div>

                <div className="textarea-item">
                    <span className='textarea-text'>面试评语</span>
                    <TextArea showCount maxLength={120} autoSize={{ minRows: 3, maxRows: 3 }} onChange={changeHandler(setInterview)} value={interview} />
                </div>
                <div className="textarea-item">
                    <span className='textarea-text'>备注</span>
                    <TextArea showCount maxLength={120} autoSize={{ minRows: 3, maxRows: 3 }} onChange={changeHandler(setRemark)} value={remarks} />
                </div>
                <div className="input-item">
                    <span className='input-text'>面试官署名</span>
                    <Input placeholder='输入姓名' onChange={changeHandler(setViewer)} value={viewer} />
                </div>
                <div className="input-item">
                    <span className='input-text'>本面是通过</span>
                    <Radio.Group defaultValue={3} onChange={changeHandler(setPass, transPass)} value={passTrans(isPass)}>
                        <Radio value={1} >
                            是
                        </Radio>
                        <Radio value={2}>
                            否
                        </Radio>
                        <Radio value={3}>
                            待定
                        </Radio>
                    </Radio.Group>
                </div>
                <div className="input-item">
                    <span className='input-text'>最终是否通过</span>
                    <Radio.Group defaultValue={3} onChange={changeHandler(setFinal, transPass)} value={passTrans(final_ispass)}>
                        <Radio value={1}>
                            是
                        </Radio>
                        <Radio value={2}>
                            否
                        </Radio>
                        <Radio value={3}>
                            待定
                        </Radio>
                    </Radio.Group>
                </div>
            </div>
            <div className="btn-item">
                <Button style={btnStyle} onClick={submit} >提交</Button>
            </div>
        </div>
    )
}

export default Evaluate