'use client'

import { EditProduct } from '@/components/EditProduct'
import { useCookies } from '@/hooks/cookies'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const CreateNewProduct = () => {
  const router = useRouter()
  const token = useCookies('session')

  useEffect(() => {
    if (!token || token.length < 0) {
      router.push('/login')
      toast.warning('É preciso logar para acessar essa página')
    }
  }, [router, token])

  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">Novo produto</h1>

      <EditProduct editing={false} />
    </section>
  )
}
