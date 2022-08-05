import { Empty } from "antd";
import { ReactNode } from "react";

const btnStyle = { backgroundColor: '#0067b8', color: 'white', padding: '5px 33px', marginLeft: '20px' }

const passTrans = (pass?: boolean) => {
    let res: number;
    switch (pass) {
        case true:
            res = 1;
            break;
        case false:
            res = 2;
            break;
        default:
            res = 3;
            break;
    }
    return res;
}
const transPass = (key?: number) => {
    let res: boolean | undefined;
    switch (key) {
        case 1:
            res = true;
            break;
        case 2:
            res = false;
            break;
        default:
            res = undefined;
            break;
    }
    return res;
}

interface dataType {
    name: string,
    userid: string,
    gender: boolean,
    wish?: number,
    major: string,
    phone?: string,
    email?: string,
    final_ispass?: boolean,
    first_ability?: number,
    first_attitude?: number,
    first_interview?: string,
    first_interviewer?: string,
    first_ispass?: boolean,
    first_remarks?: string,
    second_ability?: number,
    second_attitude?: number,
    second_interview?: string,
    second_interviewer?: string,
    second_remarks?: string,
    second_ispass?: boolean,
    third_ability?: number,
    third_attitude?: number,
    third_interview?: string,
    third_interviewer?: string,
    third_remarks?: string,
    third_ispass?: boolean,
    is_sign?: boolean,
}

const wishMapper = (wish: number | undefined): string => {
    let res: string;
    switch (wish) {
        case 1:
            res = '前端web';
            break;
        case 2:
            res = '后台java';
            break;
        case 3:
            res = '后台go';
            break;
        case 4:
            res = '机器学习';
            break;
        default:
            res = '暂无组别'
            break;
    }
    return res;
}

const transGender = (gender: boolean): ReactNode => {
    if (gender) {
        return <i className="iconfont icon-nan"></i>
    } else if (gender === false) {
        return <i className="iconfont icon-nv"></i>
    } else {
        return <span style={{ color: 'grey' }}>密</span>
    }
}

const passMapper = (isPass?: boolean | undefined) => {
    let resStr: ReactNode;
    switch (isPass) {
        case true:
            resStr = (<span className='pass'>通过</span>);
            break;
        case false:
            resStr = (<span className='notPass'>未通过</span>);
            break;
        default:
            resStr = (<span className='daiDin'>待定</span>);
            break;
    }
    return resStr;
}

interface infoProps {
    infoData: dataType,
}
interface Props {
    setLogin: any,
    jumpInfo?: any,
}

function NoData() {
    return (
        <div className='no-data'>
            <Empty
                description={
                    <span>
                        暂无操作
                    </span>
                }
            >
            </Empty>
        </div>
    )
}
export { transGender, wishMapper, btnStyle, transPass, passMapper, passTrans, NoData }

export type { dataType, infoProps, Props }

export default {}