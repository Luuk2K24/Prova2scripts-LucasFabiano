import {
  CreateProductType,
  GetAllProductsType,
  GetProductType,
  RemoveProductType,
  UpdateProductType,
} from '@/types/products'
import axios from 'axios'

export const getAllProducts: GetAllProductsType = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/products/`

  try {
    const response = await axios.get(url)

    return {
      success: true,
      products: response.data,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const createProduct: CreateProductType = async (product) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/products/`

  try {
    await axios.post(url, {
      ...product,
    })

    return {
      success: true,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const getProduct: GetProductType = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`

  try {
    const response = await axios.get(url)

    return {
      success: true,
      product: response.data,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const updateProduct: UpdateProductType = async (id, product) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`

  try {
    await axios.put(url, {
      ...product,
    })

    return {
      success: true,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const removeProduct: RemoveProductType = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`

  try {
    await axios.delete(url)

    return {
      success: true,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}
