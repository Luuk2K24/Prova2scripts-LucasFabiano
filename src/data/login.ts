import { UserLoginType } from '@/types/login'
import axios from 'axios'
import Cookies from 'universal-cookie'

export const userLogin: UserLoginType = async (credentials) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/auth/login/`

  try {
    const response = await axios.post(url, {
      ...credentials,
    })

    return {
      success: true,
      data: response.data,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const createUserSession = (token: string) => {
  const cookies = new Cookies()
  cookies.set('session', token)
}

export const deleteUserSession = () => {
  const cookies = new Cookies()
  cookies.remove('session')
}
