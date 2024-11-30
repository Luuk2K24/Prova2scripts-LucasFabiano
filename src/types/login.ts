import { ErrorResponse, SuccessResponse } from './apiResponse'

export type LoginDataType = {
  username: string
  password: string
}

export type LoginErrorsType = {
  username: string[]
  password: string[]
}

export type SuccessResponseWithSessionToken = SuccessResponse & {
  data: {
    token: string
  }
}

export type UserLoginType = (
  credentials: LoginDataType,
) => Promise<ErrorResponse | SuccessResponseWithSessionToken>
