import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://wp.rycbar.club/api/admin/attachmentinfo',
        method: 'get',
        params: query
    });
};
