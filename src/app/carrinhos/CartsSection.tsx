'use client'

import { SpinLoader } from '@/components/SpinLoader'
import { formatDate, getAllCarts, removeCart } from '@/data/carts'
import { useCookies } from '@/hooks/cookies'
import { CartType } from '@/types/carts'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

export const CartsSection = () => {
  const [carts, setCarts] = useState<CartType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()
  const token = useCookies('session')

  useEffect(() => {
    const fetchCarts = async () => {
      const result = await getAllCarts()

      if (result.success) setCarts(result.carts)
      else toast.error('Erro ao buscar produtos')

      setLoading(false)
    }

    if (!token || token.length < 0) {
      router.push('/login')
      toast.warning('É preciso logar para acessar essa página')
    } else {
      fetchCarts()
    }
  }, [router, token])

  const handleRemoveCart = async (id: number) => {
    const result = await removeCart(id)

    if (result.success) {
      const previousCarts = [...carts]
      const newCarts = previousCarts.filter((c) => c.id !== id)
      setCarts(newCarts)
      toast.success('Carrinho deletado')
    } else {
      toast.error('Erro ao remover carrinho')
    }
  }

  return (
    <section className="mb-10 rounded-md bg-white px-6 py-8 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Carrinhos de Compras
      </h1>

      <div className="mb-4 text-right">
        <Link
          className="inline-block rounded bg-green-900 px-4 py-2 text-white transition hover:bg-green-950"
          href="/novo-carrinho"
        >
          Adicionar Carrinho
        </Link>
      </div>

      {loading && (
        <div className="flex h-40 items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {!loading && carts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Data de Compra
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Usuário
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Produtos
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr key={cart.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(cart.date)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Usuário {cart.userId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {cart.products.map((product, index) => (
                      <div key={index}>
                        Produto {product.productId} - {product.quantity}{' '}
                        unidades
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                        href={`/editar-carrinho?id=${cart.id}`}
                      >
                        Editar
                      </Link>
                      <button
                        className="hover:bg-red-700 rounded bg-yellow-500 px-3 py-1 text-white transition"
                        onClick={() => handleRemoveCart(cart.id)}
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

      {!loading && carts.length === 0 && (
        <p className="text-center text-gray-500">Nenhum carrinho encontrado.</p>
      )}
    </section>
  )
}
