import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://127.0.0.1:4300/admin/userinfo',
        method: 'get',
        params: query
    });
};
