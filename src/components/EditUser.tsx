import { createUser, getUserData, updateUser } from '@/data/users'
import { editUserSchema } from '@/schemas/user'
import { EditUserType, UserErrors, UserStateType } from '@/types/users'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SpinLoader } from './SpinLoader'

const initialData: UserStateType = {
  email: '',
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  city: '',
  street: '',
  number: '',
  zipcode: '',
  lat: '',
  long: '',
  phone: '',
}

const initialErrors: UserErrors = {
  email: [],
  username: [],
  password: [],
  firstname: [],
  lastname: [],
  city: [],
  street: [],
  number: [],
  zipcode: [],
  lat: [],
  long: [],
  phone: [],
}

export const EditUser: EditUserType = ({ editing }) => {
  const [user, setUser] = useState<UserStateType>(initialData)
  const [userErrors, setUserErrors] = useState<UserErrors>(initialErrors)
  const [loading, setLoading] = useState<boolean>(true)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        const result = await getUserData(Number(id))

        if (result.success) {
          setUser(result.user)
        } else {
          toast.error('Erro ao buscar usuário')
          router.push('/usuarios')
        }

        setLoading(false)
      }
    }

    if (editing && id) fetchUserData()
    else setLoading(false)
  }, [editing, searchParams, id, router])

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(user)

    const validations = editUserSchema.safeParse(user)

    if (!validations.success) {
      setUserErrors({
        ...initialErrors,
        ...validations.error.formErrors.fieldErrors,
      })
    } else {
      if (!editing) createNewUser()
      else editUser()
    }
  }

  const editUser = async () => {
    if (id) {
      const response = await updateUser(Number(id), user)

      if (response.success) {
        toast.success('Usuário editado com sucesso')
        router.push('/usuarios')
      } else {
        toast.error('Erro ao editar usuário')
      }
    }
  }

  const createNewUser = async () => {
    const response = await createUser(user)

    if (response.success) {
      toast.success('Usuário criado com sucesso')
      setUser(initialData)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUserErrors((prevState) => ({
      ...prevState,
      [name]: [],
    }))

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <SpinLoader />
        </div>
      ) : (
        <form
          action=""
          className="mx-auto mb-20 flex w-full max-w-md flex-col gap-6 rounded-lg bg-gray-100 p-6 shadow-lg"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-5">
            <label className="flex flex-col">
              <span className="font-medium">Nome</span>
              <input
                type="text"
                placeholder="Ex: João"
                className={`rounded-sm border px-2 py-1 ${userErrors.firstname.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="firstname"
                value={user.firstname}
              />
              {userErrors.firstname.length > 0 &&
                userErrors.firstname.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">Sobrenome</span>
              <input
                type="text"
                placeholder="Ex: Silva"
                className={`rounded-sm border px-2 py-1 ${userErrors.lastname.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="lastname"
                value={user.lastname}
              />
              {userErrors.lastname.length > 0 &&
                userErrors.lastname.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">E-mail</span>
              <input
                type="text"
                placeholder="Ex: john@gmail.com"
                className={`rounded-sm border px-2 py-1 ${userErrors.email.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="email"
                value={user.email}
              />
              {userErrors.email.length > 0 &&
                userErrors.email.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">Usuário</span>
              <input
                type="text"
                placeholder="Ex: johndoe"
                className={`rounded-sm border px-2 py-1 ${userErrors.username.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="username"
                value={user.username}
              />
              {userErrors.username.length > 0 &&
                userErrors.username.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">Senha</span>
              <input
                type="password"
                placeholder="Ex: m38rmF$"
                className={`rounded-sm border px-2 py-1 ${userErrors.password.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="password"
                value={user.password}
              />
              {userErrors.password.length > 0 &&
                userErrors.password.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">Cidade</span>
              <input
                type="text"
                placeholder="Ex: Kilcoole"
                className={`rounded-sm border px-2 py-1 ${userErrors.city.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="city"
                value={user.city}
              />
              {userErrors.city.length > 0 &&
                userErrors.city.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">Rua</span>
              <input
                type="text"
                placeholder="Ex: 7835 New Road"
                className={`rounded-sm border px-2 py-1 ${userErrors.street.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="street"
                value={user.street}
              />
              {userErrors.street.length > 0 &&
                userErrors.street.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">Número</span>
              <input
                type="number"
                placeholder="Ex: 7682"
                className={`rounded-sm border px-2 py-1 ${userErrors.number.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="number"
                value={user.number}
              />
              {userErrors.number.length > 0 &&
                userErrors.number.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">CEP</span>
              <input
                type="number"
                placeholder="Ex: 129263874"
                className={`rounded-sm border px-2 py-1 ${userErrors.zipcode.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="zipcode"
                value={user.zipcode}
              />
              {userErrors.zipcode.length > 0 &&
                userErrors.zipcode.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">Latitude</span>
              <input
                type="number"
                placeholder="Ex: -37.3159"
                className={`rounded-sm border px-2 py-1 ${userErrors.lat.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="lat"
                value={user.lat}
              />
              {userErrors.lat.length > 0 &&
                userErrors.lat.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">Longitude</span>
              <input
                type="number"
                placeholder="Ex: 81.1496"
                className={`rounded-sm border px-2 py-1 ${userErrors.long.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="long"
                value={user.long}
              />
              {userErrors.long.length > 0 &&
                userErrors.long.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="font-medium">Telefone</span>
              <input
                type="number"
                placeholder="Ex: 15702367033"
                className={`rounded-sm border px-2 py-1 ${userErrors.phone.length > 0 ? 'border-red' : 'border-gray-400'}`}
                onChange={handleInputChange}
                name="phone"
                value={user.phone}
              />
              {userErrors.phone.length > 0 &&
                userErrors.phone.map((error, index) => (
                  <small key={index}>{error}</small>
                ))}
            </label>

            <button
              className="rounded-md bg-green-900 px-4 py-2 text-lg font-semibold text-white transition hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-green-900"
              type="submit"
            >
              {editing ? 'Editar usuário' : 'Criar novo usuário'}
            </button>
          </div>
        </form>
      )}
    </>
  )
}
