'use client'

import { SpinLoader } from '@/components/SpinLoader'
import { getAllUsers, removeUser } from '@/data/users'
import { useCookies } from '@/hooks/cookies'
import { UserTypeWithId } from '@/types/users'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

export const UsersSection = () => {
  const [users, setUsers] = useState<UserTypeWithId[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()
  const token = useCookies('session')

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers()

      if (response.success) {
        setUsers(response.users)
      } else {
        toast.error('Erro ao buscar dados')
      }

      setLoading(false)
    }

    if (!token || token.length < 0) {
      router.push('/login')
      toast.warning('É preciso logar para acessar essa página')
    } else {
      fetchUsers()
    }
  }, [router, token])

  const handleRemoveUser = async (id: number) => {
    const result = await removeUser(id)

    if (result.success) {
      const updatedUsers = users.filter((user) => user.id !== id)
      setUsers(updatedUsers)
      toast.success('Usuário deletado')
    } else {
      toast.error('Erro ao remover usuário')
    }
  }

  return (
    <section className="mb-10 rounded-md bg-white px-6 py-8 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Lista de Usuários
      </h1>

      <div className="mb-4 text-right">
        <Link
          href="/novo-usuario"
          className="inline-block rounded bg-green-900 px-4 py-2 text-white transition hover:bg-green-950"
        >
          Adicionar Usuário
        </Link>
      </div>

      {loading && (
        <div className="flex h-40 items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Nome
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Usuário
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  E-mail
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Telefone
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Endereço
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Latitude/longitude
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name.firstname} {user.name.lastname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.phone}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {user.address.street}, {user.address.number},{' '}
                    {user.address.city} - {user.address.zipcode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.address.geolocation.lat} /{' '}
                    {user.address.geolocation.long}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/editar-usuario?id=${user.id}`}
                        className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleRemoveUser(user.id)}
                        className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-500"
                      >
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && users.length === 0 && (
        <p className="text-center text-gray-500">Nenhum usuário encontrado.</p>
      )}
    </section>
  )
}
