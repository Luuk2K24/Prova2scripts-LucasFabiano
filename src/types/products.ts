import { ErrorResponse, SuccessResponse } from './apiResponse'

export type ProductType = {
  id: number
  title: string
  category: string
  description: string
  image: string
  price: number
  rating: {
    count: number
    rate: number
  }
}

export type SuccessResponseWithAllProducts = SuccessResponse & {
  products: ProductType[]
}

export type SuccessResponseWithProduct = SuccessResponse & {
  product: ProductType
}

export type GetAllProductsType = () => Promise<
  ErrorResponse | SuccessResponseWithAllProducts
>

export type EditProductProps = {
  editing: boolean
}

export type EditProductType = (props: EditProductProps) => JSX.Element

export type EditProductData = {
  title: string
  price: number
  description: string
  image: string
  category: string
}

export type EditProductDataErrors = {
  title: string[]
  price: string[]
  description: string[]
  image: string[]
  category: string[]
}

export type CreateProductType = (
  product: EditProductData,
) => Promise<SuccessResponse | ErrorResponse>

export type GetProductType = (
  id: number,
) => Promise<ErrorResponse | SuccessResponseWithProduct>

export type UpdateProductType = (
  id: number,
  product: EditProductData,
) => Promise<SuccessResponse | ErrorResponse>

export type RemoveProductType = (
  id: number,
) => Promise<SuccessResponse | ErrorResponse>
