
import axios from 'axios'
import router from '../router'
//import { Message } from 'element-ui'
import store from '../store'

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        let tokenKey = "";
        if (config.url != "/logIn") {
            tokenKey = localStorage.getItem('currUserTokenKey');;  //需要通过localStorage中获取服务端Key
        }
        config.baseURL = '/api/'
        config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
        config.timeout = 2500
        config.headers = {
            'access-token': tokenKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        // response.status 服务端返回成功，否则为失败
        if (response.status != 200 || (response.data && response.data.code && response.data.code != 200)) {
            // Message.error({
            //     message: "用户未登录，请退出重新登录！"
            // })
            var params = { tokenKey: localStorage.getItem("currUserTokenKey") };
            store.dispatch('logOut', params).then((data) => {
                router.replace({ path: '/login' });
            })
        }
        return response.data
    },
    error => {
        return Promise.reject(error)
        router.replace({
            path: '404',
            query: { message: error }
        });
    }
)