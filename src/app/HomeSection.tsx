'use client'

import { getGeralData } from '@/data/geral'
import { useCookies } from '@/hooks/cookies'
import { GeralDataType } from '@/types/geral'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const HomeSection = () => {
  const [data, setData] = useState<GeralDataType>()
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()
  const token = useCookies('session')

  useEffect(() => {
    const fetchData = async () => {
      const result = await getGeralData()

      if (result.success) setData(result.geralData)
      else toast.warning('Falha ao buscar dados')

      setLoading(false)
    }

    if (token && token.length > 0) {
      fetchData()
    } else {
      toast.warning('É preciso logar para acessar essa página')
      router.push('/login')
    }
  }, [router, token])

  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">Início</h1>

      <div className="absolute left-1/2 max-w-96 -translate-x-1/2 rounded-md border border-gray-400">
        {/* Número de produtos */}
        <div className="flex items-center justify-center gap-4 p-5">
          <p className="text-xl font-medium">Número de produtos:</p>

          <div className="flex h-14 items-center justify-center">
            {loading ? (
              <div className="flex items-center justify-center">
                Carregando...
              </div>
            ) : (
              <p className="text-2xl font-semibold">{data?.totalProducts}</p>
            )}
          </div>
        </div>

        {/* Total de categorias */}
        <div className="flex items-center justify-center gap-4 p-5">
          <p className="text-xl font-medium">Número de categorias:</p>

          <div className="flex h-14 items-center justify-center">
            {loading ? (
              <div className="flex items-center justify-center">
                Carregando...
              </div>
            ) : (
              <p className="text-2xl font-semibold">{data?.totalCategories}</p>
            )}
          </div>
        </div>

        {/* Total de pedidos */}
        <div className="flex items-center justify-center gap-4 p-5">
          <p className="text-xl font-medium">Número de pedidos:</p>

          <div className="flex h-14 items-center justify-center">
            {loading ? (
              <div className="flex items-center justify-center">
                Carregando...
              </div>
            ) : (
              <p className="text-2xl font-semibold">{data?.totalOrders}</p>
            )}
          </div>
        </div>

        {/* Total de usuários */}
        <div className="flex items-center justify-center gap-4 p-5">
          <p className="text-xl font-medium">Número de usuários:</p>

          <div className="flex h-14 items-center justify-center">
            {loading ? (
              <div className="flex items-center justify-center">
                Carregando...
              </div>
            ) : (
              <p className="text-2xl font-semibold">{data?.totalUsers}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
