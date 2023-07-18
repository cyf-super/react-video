import request from '@/utils/request'

export const getCategories = () =>
  request.get<Category.Response, Category.Response>('/api/file-Category')
