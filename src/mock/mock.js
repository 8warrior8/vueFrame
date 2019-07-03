import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

export default {
    bootstrap() {
        let mock = new MockAdapter(axios);

        //登录
        mock.onPost('/logIn').reply(config => {
            let { username, password } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                var userInfo = require('./json/userInfo.json');
                resolve([200, { code: 200, msg: '请求成功', data: userInfo.loginUser }]);
            });
        });


        //获取登录用户对应的权限
        mock.onPost('/userInfo').reply(config => {
            let { tokenKey } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                var userInfo = require('./json/userInfo.json');
                resolve([200, { code: 200, msg: '请求成功', data: userInfo.userInfo }]);
            });
        });

        //登出系统
        mock.onPost('/logOut').reply(config => {
            let { tokenKey } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                resolve([200, { code: 200, msg: '请求成功', data: {} }]);
            });
        });

        // 获取图书相关数据信息
        mock.onPost('/bookInfo').reply(config => {
            let { tokenKey } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                resolve([200, { code: 300, msg: '请求失败', data: {} }]);
            });
        });

        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        });

        // 根据省ID获取该省下的地市信息
        mock.onGet('/localRegion').reply(config => {
            return new Promise((resolve, reject) => {
                var generalInfo = require('./json/gcssGeneralInfo.json');
                resolve([200, { code: 200, msg: '请求成功', data: generalInfo.regionList }]);
            });
        });

        // 根据省ID获取该省下的地市信息
        mock.onGet('/leftBusinessCount').reply(config => {
            return new Promise((resolve, reject) => {
                var generalInfo = require('./json/gcssGeneralInfo.json');
                resolve([200, { code: 200, msg: '请求成功', data: generalInfo.leftbusinessInfo }]);
            });
        });

        // 根据省ID获取该省下的地市专线数量
        mock.onGet('/leftTopCount').reply(config => {
            return new Promise((resolve, reject) => {
                var generalInfo = require('./json/gcssGeneralInfo.json');
                resolve([200, { code: 200, msg: '请求成功', data: generalInfo.lefttopInfo }]);
            });
        });

        // 根据省ID获取该省下的地市专线数量
        mock.onGet('/leftTopAlarm').reply(config => {
            return new Promise((resolve, reject) => {
                var generalInfo = require('./json/gcssGeneralInfo.json');
                resolve([200, { code: 200, msg: '请求成功', data: generalInfo.lefttopalarm }]);
            });
        });

        // 获取客户等级字典数据信息
        mock.onGet('/resourceDicByLevel').reply(config => {
            return new Promise((resolve, reject) => {
                var generalInfo = require('./json/gcssGeneralInfo.json');
                resolve([200, { code: 200, msg: '请求成功', data: generalInfo.resourceLevel }]);
            });
        });

        mock.onGet('/rightClientSum').reply(config => {
            return new Promise((resolve, reject) => {
                var generalInfo = require('./json/gcssGeneralInfo.json');
                resolve([200, { code: 200, msg: '请求成功', data: generalInfo.rightClientSum }]);
            });
        });

        mock.onGet('/rightClientAlarm').reply(config => {
            return new Promise((resolve, reject) => {
                var generalInfo = require('./json/gcssGeneralInfo.json');
                resolve([200, { code: 200, msg: '请求成功', data: generalInfo.rightClientSumAlarm }]);
            });
        });



    }
};