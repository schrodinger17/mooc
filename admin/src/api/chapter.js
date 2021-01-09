import request from '../utils/request';


export default {
    // 课程章节列表
    getNestedTreeList(courseId) {
      return request({
        // url: `/admin/edu/chapter/nested-list/${courseId}`,
        url: `chapter.json`,
        method: 'get'
      })
    },
    // 删除章节
    removeById(id) {
      return request({
        url: `/admin/edu/chapter/remove/${id}`,
        method: 'delete'
      })
    },
    // 保存章节信息
    save(chapter) {
      return request({
        url: '/admin/edu/chapter/save',
        method: 'post',
        data: chapter
      })
    },
    // 根据章节id获得章节信息
    getById(id) {
      return request({
        url: `/admin/edu/chapter/get/${id}`,
        method: 'get'
      })
    },
    // 更新章节信息
    updateById(chapter) {
      return request({
        url: '/admin/edu/chapter/update',
        method: 'put',
        data: chapter
      })
    }
  }