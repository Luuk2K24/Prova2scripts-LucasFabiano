import { ErrorResponse, SuccessResponse } from './apiResponse'

export type GeralDataType = {
  totalProducts: number
  totalCategories: number
  totalOrders: number
  totalUsers: number
}

export type SuccessResponseWithGeralData = SuccessResponse & {
  geralData: GeralDataType
}

export type GetGeralDataType = () => Promise<
  ErrorResponse | SuccessResponseWithGeralData
>
