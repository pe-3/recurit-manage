import { Empty } from 'antd'
import React from 'react'
import { infoProps } from './funcs';
import { transGender, wishMapper, passMapper } from './funcs';

const ShowInfo: React.FC<infoProps> = (props) => {
    let { name, userid, gender, wish, major, email, phone, final_ispass, is_sign } = props.infoData;

    let { first_ability, first_attitude, first_interview, first_interviewer, first_remarks, first_ispass } = props.infoData;

    let isFirstFinish: boolean = false;
    if (first_ability && first_attitude && first_interview && first_interviewer && first_remarks) {
        isFirstFinish = true;
    }

    let isSecondFinish: boolean = false;
    let { second_ability, second_attitude, second_interview, second_interviewer, second_remarks, second_ispass } = props.infoData;
    if (second_ability && second_attitude && second_interview && second_interviewer && second_remarks) {
        isSecondFinish = true;
    }

    let isThirdFinish: boolean = false;
    let { third_ability, third_attitude, third_interview, third_interviewer, third_remarks, third_ispass } = props.infoData;
    if (third_ability && third_attitude && third_interview && third_interviewer && third_remarks) {
        isThirdFinish = true;
    }

    return (
        <div className='show-info'>
            <h3 className='head-title'>面试信息</h3>
            <div className="shadow-box info-item-wrapper">
                <div className="info-item">
                    <div className="info-item-title">个人信息</div>
                </div>
                <div className="info-item">
                    <div className="info-item-name">姓名</div>
                    <div className="info-item-val">{name}</div>
                </div>
                <div className="info-item">
                    <div className="info-item-name">性别</div>
                    <div className="info-item-val">{transGender(gender)}</div>
                </div>
            </div>
            <div className="info-item-wrapper shadow-box">
                <div className="info-item">
                    <div className="info-item-title">账户信息</div>
                </div>
                <div className="info-item">
                    <div className="info-item-name">电话</div>
                    <div className="info-item-val">{phone}</div>
                </div>
                <div className="info-item">
                    <div className="info-item-name">邮箱</div>
                    <div className="info-item-val">{email}</div>
                </div>
            </div>
            <div className="info-item-wrapper shadow-box">
                <div className="info-item">
                    <div className="info-item-title">专业信息</div>
                </div>
                <div className="info-item">
                    <div className="info-item-name">学号</div>
                    <div className="info-item-val">{userid}</div>
                </div>
                <div className="info-item">
                    <div className="info-item-name">专业班级</div>
                    <div className="info-item-val">{major}</div>
                </div>
            </div>
            <div className="info-item-wrapper shadow-box">
                <div className="info-item">
                    <div className="info-item-name">签到</div>
                </div>
                <div className="info-item">
                    <div className="info-item-name">是否签到</div>
                    <div className="info-item-val">{is_sign ? '是' : '否'}</div>
                </div>
            </div>
            <div className="shadow-box info-item-wrapper">
                <div className="info-item">
                    <div className="info-item-title">意愿</div>
                </div>
                <div className="info-item">
                    <div className="info-item-name">意愿组别</div>
                    <div className="info-item-val">{wishMapper(wish)}</div>
                </div>
            </div>
            <div className="info-item-wrapper shadow-box">
                <div className="info-item">
                    <div className="info-item-title">一面信息</div>
                </div>
                {isFirstFinish ? (<div>
                    <div className="info-item">
                        <div className="info-item-name">面试官</div>
                        <div className="info-item-val">{first_interviewer}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-name">能力分</div>
                        <div className="info-item-val">{first_ability}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-name">态度分</div>
                        <div className="info-item-val">{first_attitude}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-name">是否通过</div>
                        <div className="info-item-val">{passMapper(first_ispass)}</div>
                    </div>
                    <div className="info-item comment-item">
                        <div className="info-item-name">面评</div>
                        <div className="comment-val">{first_interviewer}</div>
                    </div>
                    <div className="info-item comment-item">
                        <div className="info-item-name">备注</div>
                        <div className="comment-val">{first_remarks}</div>
                    </div>
                </div>) : <Empty />}
            </div>
            <div className="info-item-wrapper shadow-box">
                <div className="info-item">
                    <div className="info-item-title">二面信息</div>
                </div>
                {isSecondFinish ? (<div>
                    <div className="info-item">
                        <div className="info-item-name">面试官</div>
                        <div className="info-item-val">{second_interviewer}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-name">能力分</div>
                        <div className="info-item-val">{second_ability}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-name">态度分</div>
                        <div className="info-item-val">{second_attitude}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-name">是否通过</div>
                        <div className="info-item-val">{passMapper(second_ispass)}</div>
                    </div>
                    <div className="info-item comment-item">
                        <div className="info-item-name">面评</div>
                        <div className="comment-val">{second_interview}</div>
                    </div>
                    <div className="info-item comment-item">
                        <div className="info-item-name">备注</div>
                        <div className="comment-val">{second_remarks}</div>
                    </div>
                </div>) : <Empty />}
            </div>
            <div className="info-item-wrapper shadow-box">
                <div className="info-item">
                    <div className="info-item-title">三面信息</div>
                </div>
                {isThirdFinish ? (<div>
                    <div className="info-item">
                        <div className="info-item-name">面试官</div>
                        <div className="info-item-val">{third_interviewer}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-name">能力分</div>
                        <div className="info-item-val">{third_ability}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-name">态度分</div>
                        <div className="info-item-val">{third_attitude}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-item-name">是否通过</div>
                        <div className="info-item-val">{passMapper(third_ispass)}</div>
                    </div>
                    <div className="info-item comment-item">
                        <div className="info-item-name">面评</div>
                        <div className="comment-val">{third_interview}</div>
                    </div>
                    <div className="info-item comment-item">
                        <div className="info-item-name">备注</div>
                        <div className="comment-val">{third_remarks}</div>
                    </div>
                </div>) : <Empty />}
            </div>
            <div className="info-item-wrapper shadow-box">
                <div className="info-item">
                    <div className="info-item-title">最终结果</div>
                </div>
                <div className="info-item">
                    <div className="info-item-name">最终通过</div>
                    <div className="info-item-val">{passMapper(final_ispass)}</div>
                </div>
            </div>
        </div>
    )
}

export default ShowInfo