import { ErrorResponse, SuccessResponse } from './apiResponse'

export type UserType = {
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}

export type UserTypeWithId = {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}

export type UserStateType = {
  email: string
  username: string
  password: string
  firstname: string
  lastname: string
  city: string
  street: string
  number: string
  zipcode: string
  lat: string
  long: string
  phone: string
}

export type UserErrors = {
  email: string[]
  username: string[]
  password: string[]
  firstname: string[]
  lastname: string[]
  city: string[]
  street: string[]
  number: string[]
  zipcode: string[]
  lat: string[]
  long: string[]
  phone: string[]
}

export type SuceessResponseWithAllUsers = SuccessResponse & {
  users: UserTypeWithId[]
}

export type GetAllUsersType = () => Promise<
  ErrorResponse | SuceessResponseWithAllUsers
>

export type RemoveUserType = (
  id: number,
) => Promise<ErrorResponse | SuccessResponse>

export type EditUserProps = {
  editing: boolean
}

export type EditUserType = (props: EditUserProps) => JSX.Element

export type CreateUserType = (
  user: UserStateType,
) => Promise<ErrorResponse | SuccessResponse>

export type SuccessResponseWithUserData = SuccessResponse & {
  user: UserStateType
}

export type GetUserDataType = (
  id: number,
) => Promise<ErrorResponse | SuccessResponseWithUserData>

export type UpdateUserType = (
  id: number,
  user: UserStateType,
) => Promise<ErrorResponse | SuccessResponse>
