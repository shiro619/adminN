import request from '@/utils/request'

export function listInquire(pv) {
  return request({
    url: '/Api/workplatform/listworkplatform/',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

