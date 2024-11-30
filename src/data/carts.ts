import {
  CreateCartItemType,
  GetAllCartsType,
  GetCartType,
  RemoveCartType,
  UpdateCartItemsType,
} from '@/types/carts'
import axios from 'axios'

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

export const getAllCarts: GetAllCartsType = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/carts`

  try {
    const result = await axios.get(url)

    return {
      success: true,
      carts: result.data,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const removeCart: RemoveCartType = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/carts/${id}`

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

export const getCart: GetCartType = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/carts/${id}`

  try {
    const response = await axios.get(url)

    return {
      success: true,
      cart: response.data,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const createCartItem: CreateCartItemType = async (cart) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/carts/`

  try {
    await axios.post(url, {
      ...cart,
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

export const updateCartItems: UpdateCartItemsType = async (id, cart) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/carts/${id}`

  try {
    await axios.put(url, {
      ...cart,
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
