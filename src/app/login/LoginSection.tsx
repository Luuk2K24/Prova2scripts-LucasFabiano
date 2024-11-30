'use client'

import { createUserSession, userLogin } from '@/data/login'
import { LoginDataType, LoginErrorsType } from '@/types/login'
import { useState } from 'react'
import { toast } from 'react-toastify'

const initialData: LoginDataType = {
  username: '',
  password: '',
}

const initialErrors: LoginErrorsType = {
  username: [],
  password: [],
}

export const LoginSection = () => {
  const [loginData, setLoginData] = useState<LoginDataType>(initialData)
  const [loginErrors, setLoginErrors] = useState<LoginErrorsType>(initialErrors)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setLoginErrors((prevState) => ({
      ...prevState,
      [name]: [],
    }))

    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await userLogin(loginData)

    if (result.success) {
      createUserSession(result.data.token)
      toast.success('Login realizado')

      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } else {
      toast.warning('Usuário não encontrado')
    }
  }

  return (
    <section>
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Login
      </h1>

      <form
        action=""
        className="mx-auto mb-20 flex w-full max-w-md flex-col gap-6 rounded-lg bg-gray-100 p-6 shadow-lg"
        onSubmit={handleFormSubmit}
      >
        <label className="flex flex-col">
          <span className="mb-1 text-lg font-medium text-gray-700">Nome</span>
          <input
            type="text"
            placeholder="Informe seu nome"
            className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loginErrors.username.length > 0
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={handleInputChange}
            name="username"
            value={loginData.username}
          />
          {loginErrors.username.length > 0 &&
            loginErrors.username.map((error, index) => (
              <small key={index} className="text-red-500 mt-1 text-sm">
                {error}
              </small>
            ))}
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-lg font-medium text-gray-700">Senha</span>
          <input
            type="password"
            placeholder="Informe sua senha"
            className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loginErrors.password.length > 0
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            onChange={handleInputChange}
            name="password"
            value={loginData.password}
          />
          {loginErrors.password.length > 0 &&
            loginErrors.password.map((error, index) => (
              <small key={index} className="text-red-500 mt-1 text-sm">
                {error}
              </small>
            ))}
        </label>

        <button
          className="rounded-md bg-green-900 px-4 py-2 text-lg font-semibold text-white transition hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-green-900"
          type="submit"
        >
          Acessar
        </button>
      </form>
    </section>
  )
}
