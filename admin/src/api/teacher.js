import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://wp.rycbar.club/api/admin/teacherinfo',
        method: 'get',
        params: query
    });
};
