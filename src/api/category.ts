import request from '@/utils/request'

// 获取类别
export const getCategories = () =>
  request.get<Category.Response, Category.Response>('/file-Category')

// 创建类别
export const createCategory = (name: string) =>
  request.post<Category.Response, Category.Response>('/file-Category', {
    name,
  })

// 更新类别
export const updateCategory = (categoryId: string, name: string) =>
  request.put<Category.Response, Category.Response>('/file-Category', {
    name,
    categoryId,
  })

// 删除类别
export const deleteCategory = (categoryId: string) =>
  request.delete<Category.Response, Category.Response>('/file-Category', {
    data: {
      categoryId,
    },
  })

// 交换类别位置
export const changeCategory = (categoryId1: string, categoryId2: string) =>
  request.put<Category.Response, Category.Response>('/file-Category/seat', {
    categoryId1,
    categoryId2,
  })
