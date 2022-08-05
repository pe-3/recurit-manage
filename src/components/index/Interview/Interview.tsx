import { message, } from 'antd'
import { Component, } from 'react'
import acat from '../../../req/requests';
import ListShow from './littlePiece/listshow';
import Evaluate from './littlePiece/Evaluate';
import ShowInfo from './littlePiece/showinfo';
import { Props, NoData, dataType } from './littlePiece/funcs';

import './interview.css'

export default class Interview extends Component<Props, object> {

    state: Readonly<{ render: 'showInfo' | 'evaluate' | 'empty', infoData: dataType }> = {
        render: 'empty',
        infoData: {
            name: '',
            userid: '',
            gender: true,
            wish: 0,
            major: '',
        }
    };

    jumpInfo = (val: any, path?: 'showInfo' | 'evaluate' | 'empty') => {

        acat.getOtherInf({
            params: {
                userid: val.userid,
            }
        }).then(() => {
            let { code, msg, data } = acat.getData('getOtherInf');
            if (!code) {
                console.log(val);
                let oldData = Object.assign(val, data);
                acat.queryInview({
                    data: {
                        similarName: val.name,
                        "page": 1,
                        "limit": 5,
                        "fields": [
                            {
                                "field": "userid",
                                "isDesc": true
                            }
                        ],
                    }
                }).then(() => {
                    let { code, msg, data } = acat.getData('queryInview');
                    if (!code) {
                        this.setState({
                            infoData: Object.assign(oldData, data[0]),
                            render: path ? path : 'showInfo',
                        })
                    }
                    message.info(msg)
                })

            } else {
                message.info(msg);
            }
        })
        
    }

    render() {
        let { render } = this.state;
        return (
            <div className='Interview'>
                <div className="more-input">
                    <ListShow setLogin={this.props.setLogin} jumpInfo={this.jumpInfo} />
                    {render === 'evaluate' ? <Evaluate infoData={this.state.infoData} /> : ''}
                    {render === 'showInfo' ? <ShowInfo infoData={this.state.infoData} /> : ''}
                    {render === 'empty' ? <NoData /> : ''}
                </div>
            </div>
        )
    }
}


