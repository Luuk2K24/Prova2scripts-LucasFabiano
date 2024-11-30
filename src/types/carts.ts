import { ErrorResponse, SuccessResponse } from './apiResponse'

export type ProductCartType = {
  productId: number
  quantity: number
}

export type CartType = {
  id: number
  userId: number
  date: string
  products: ProductCartType[]
}

export type SuccessResponseWithAllCartsType = SuccessResponse & {
  carts: CartType[]
}

export type SuccessResponseWithCartType = SuccessResponse & {
  cart: CartType
}

export type GetAllCartsType = () => Promise<
  ErrorResponse | SuccessResponseWithAllCartsType
>

export type RemoveCartType = (
  id: number,
) => Promise<ErrorResponse | SuccessResponse>

export type EditCartProps = {
  editing: boolean
}

export type EditCartType = (props: EditCartProps) => JSX.Element

export type CartDataType = {
  userId: number
  date: string
  products: ProductCartType[]
}

export type GetCartType = (
  id: number,
) => Promise<ErrorResponse | SuccessResponseWithCartType>

export type CreateCartItemType = (
  cart: CartDataType,
) => Promise<ErrorResponse | SuccessResponse>

export type UpdateCartItemsType = (
  id: number,
  cart: CartDataType,
) => Promise<ErrorResponse | SuccessResponse>
