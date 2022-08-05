import acatReq from 'acat-req';

const reqOpts = [
    {
        url: '',
        name: 'localtest',
    },
    {
        url: 'user/user/sendVerifyEmail',
        name: 'sendVeriCode',
        method: 'post',
        data: {
            "action": "注册",
            "email": "927423201@qq.com",
        },
    },
    {
        url: 'user/user/signup',
        name: 'signup',
        method: 'post',
        data: {
            "email": "927423201@qq.com",
            "userid": "04202084",
            "verifyCode": "330547",
            "password": "12345"
        }
    },
    {
        url: 'user/user/login',
        name: 'login',
        method: 'post'
    },
    {
        url: 'user/user/updateInf',
        name: 'updateInf',
        method: 'post'
    },
    {
        url: "user/user/getInf",
        method: 'post',
        name: 'getInf',
    },
    {
        url: "user/user/resetMainInf",
        name: 'resetSignInf',
        method: 'post',
    },
    {
        url: 'user/user/sign',
        name: 'sign'
    },
    //面试者部分
    {
        url: "interview/user/get",
        name: 'getInterRes'
    },
    //管理员
    {
        url: "user/admin/unsetsign",
        name: 'unsetsign',
        method: 'post'
    },
    {
        url: "interview/admin/init",
        name: 'initInter',
        method: 'post',
    },
    {
        url: "interview/admin/update",
        name: "evaluate",
        method: "post",
    },
    {
        url: "interview/admin/send",
        method: 'post',
        name: 'sendResult',
    },
    {
        url: "interview/admin/query",
        name: 'queryInview',
        method: 'post'
    },
    {
        url: 'user/admin/getInf',
        name: 'getOtherInf',
    },
    //超管
    {
        url: "user/super_admin/changeAuth",
        name: "changeAuth",
        method: 'post'
    },
    {
        url: "interview/super_admin/del",
        name: 'delInview',
    },
    {
        url: "interview/user/getEvaluate",
        name: 'getEvaluate',
    }
];

const defaultOpts = {
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'http://ali.newimg.ltd:8080/'
}

const acat = acatReq(reqOpts, defaultOpts);

export default acat