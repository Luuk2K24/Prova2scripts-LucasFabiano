'use client'

import { SpinLoader } from '@/components/SpinLoader'
import { getAllProducts, removeProduct } from '@/data/products'
import { useCookies } from '@/hooks/cookies'
import { ProductType } from '@/types/products'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

export const AllProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()
  const token = useCookies('session')

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts()

      if (response.success) setProducts(response.products)
      else toast.error('Erro ao buscar dados de produtos')

      setLoading(false)
    }

    if (token && token.length > 0) {
      fetchProducts()
    } else {
      toast.warning('É preciso logar para acessar essa página')
      router.push('/login')
    }
  }, [token, router])

  const handleRemoveProduct = async (id: number) => {
    const result = await removeProduct(id)

    if (result.success) {
      const updatedProducts = products.filter((product) => product.id !== id)
      setProducts(updatedProducts)
      toast.success('Produto removido')
    } else {
      toast.error('Erro ao remover produto')
    }
  }

  return (
    <section className="mb-10 rounded-md bg-white px-6 py-8 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Lista de Produtos
      </h1>

      <div className="mb-4 text-right">
        <Link
          href="/novo-produto"
          className="inline-block rounded bg-green-900 px-4 py-2 text-white transition hover:bg-green-950"
        >
          Adicionar Produto
        </Link>
      </div>

      {loading && (
        <div className="flex h-40 items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Imagem
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Nome
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Descrição
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Categoria
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Preço
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Avaliações
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Estrelas
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center justify-center">
                      <img src={product.image} alt="produto" className="h-10" />
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    R${product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.rating.count}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.rating.rate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/editar-produto?id=${product.id}`}
                        className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="bg-red-600 hover:bg-red-700 rounded bg-yellow-500 px-3 py-1 text-white transition"
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

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      )}
    </section>
  )
}
