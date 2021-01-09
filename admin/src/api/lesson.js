import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://wp.rycbar.club/api/admin/lessoninfo',
        method: 'get',
        params: query
    });
};
export const getCatalog = query => {
    return request({
        url: './catalog.json',
        method: 'get',
        params: query
    });
};
