import { GeralDataType, GetGeralDataType } from '@/types/geral'
import { getAllProducts } from './products'
import { getAllCarts } from './carts'
import { getAllUsers } from './users'

export const getGeralData: GetGeralDataType = async () => {
  try {
    const geralData: GeralDataType = {
      totalProducts: 0,
      totalCategories: 0,
      totalOrders: 0,
      totalUsers: 0,
    }

    const allProducts = await getAllProducts()

    if (allProducts.success) {
      geralData.totalProducts = allProducts.products.length

      const uniqueCategories = new Set(
        allProducts.products.map((product) => product.category),
      )
      geralData.totalCategories = uniqueCategories.size
    }

    const allOrders = await getAllCarts()

    if (allOrders.success) {
      geralData.totalOrders = allOrders.carts.length
    }

    const allUsers = await getAllUsers()

    if (allUsers.success) {
      geralData.totalUsers = allUsers.users.length
    }

    return {
      success: true,
      geralData,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}
