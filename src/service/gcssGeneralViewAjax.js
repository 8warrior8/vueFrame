import axios from 'axios'

// 登录 退出  修改密码
let base = '';
//获取当前登录用户地市相关数据信息
export const getGeneralReionInfo = params => {
    return axios.get('/localRegion', params).then(
        res => res.data);
};

//获取客户数量和业务数量
export const getGeneralLeftBusinessCount = params => {
    return axios.get('/leftBusinessCount', params).then(
        res =>
            res.data
    );
};

//获取客户数量和业务数量
export const getGeneralLeftTopCount = params => {
    return axios.get('/leftTopCount', params).then(
        res =>
            res.data
    );
};
//获取客户数量和业务数量
export const getGeneralLeftTopAlarm = params => {
    return axios.get('/leftTopAlarm', params).then(
        res =>
            res.data
    );
};