import axios from 'axios'

// 登录 退出  修改密码
let base = '';
export const requestLogin = params => { return axios.post('/logIn', params).then(res => res.data); };
export const requestUserInfo = params => { return axios.post('/userInfo', params).then(res => res.data); };
export const requestLoginOut = params => { 
    return axios.post('/logOut', params).then(
        res => res.data
        ); 
    };


//获取图书相关数据信息
export const requestBookInfo = params => { return axios.post('/bookInfo', params).then(res => res.data); };



export const getCaptchaImg = params => { return axios.get(`${base}/user/logIn`, params).then(res => res.data); };
export const setPassword = params => { return axios.post(`${base}/user/setPassword`, params).then(res => res.data); };
