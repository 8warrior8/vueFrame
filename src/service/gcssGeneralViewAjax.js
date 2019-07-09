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
//获取客户等级字典数据信息
export const getResourceDicByLevel = params => {
    return axios.get('/resourceDicByLevel', params).then(
        res =>
            res.data
    );
};
//获取客户资源数据
export const getRightClientSum = params => {
    return axios.get('/rightClientSum', params).then(
        res =>
            res.data
    );
};

//获取告警数据
export const getRightClientAlarm = params => {
    return axios.get('/rightClientAlarm', params).then(
        res =>
            res.data
    );
};

//获取重保信息
export const getGroupItemInfo = params => {
    return axios.get('/groupItemInfo', params).then(
        res =>
            res.data
    );
};