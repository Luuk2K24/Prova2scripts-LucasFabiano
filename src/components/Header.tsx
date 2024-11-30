'use client'

import { useEffect, useState } from 'react'
import { useCookies } from '@/hooks/cookies'
import { deleteUserSession } from '@/data/login'
import Link from 'next/link'
import { toast } from 'react-toastify'

export const Header = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [mobile, setMobile] = useState<boolean>(false)
  const [mobileLoading, setMobileLoading] = useState<boolean>(true)
  const [token, setToken] = useState<string | null>(null)

  const currentToken = useCookies('session')

  useEffect(() => {
    if (currentToken) setToken(currentToken)
  }, [currentToken])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setMobile(width < 768)
      setMobileLoading(false)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => removeEventListener('resize', handleResize)
  }, [])

  const handleLogOutClick = () => {
    setMenuActive(false)
    deleteUserSession()
    setToken(null)
    toast.success('Deslogado com sucesso')

    setTimeout(() => {
      window.location.href = '/login'
    }, 1500)
  }

  return (
    <header className="mx-auto max-w-1440px px-4 py-2 md:px-8 lg:px-10">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-green-900">
            <span className="text-2xl font-bold">MegaMix</span>
          </h1>
        </Link>

        <button
          className="text-bold flex flex-col items-end gap-1 text-xl md:hidden"
          onClick={() => setMenuActive(true)}
        >
          Menu
        </button>

        <div
          className={`${menuActive ? 'fixed inset-0 z-40 bg-black opacity-90 md:hidden' : 'hidden'}`}
        >
          <button
            className="absolute right-10 top-10 border border-white px-4 py-2 text-4xl text-white"
            onClick={() => setMenuActive(false)}
          >
            X
          </button>
        </div>

        {!mobileLoading && (
          <nav
            className={`fixed top-20 z-50 flex flex-col gap-4 text-xl font-semibold text-white md:static md:flex-row md:gap-0 md:text-black ${!menuActive && mobile && 'hidden'}`}
          >
            <Link
              href="/produtos"
              className="px-3 hover:text-green-800"
              onClick={() => setMenuActive(false)}
            >
              Produtos
            </Link>

            <Link
              href="/carrinhos"
              className="px-3 hover:text-green-800"
              onClick={() => setMenuActive(false)}
            >
              Carrinhos
            </Link>

            <Link
              href="/usuarios"
              className="px-3 hover:text-green-800"
              onClick={() => setMenuActive(false)}
            >
              Usuários
            </Link>

            {token && token.length > 0 ? (
              <button
                type="button"
                className="px-3 text-start hover:text-green-800"
                onClick={handleLogOutClick}
              >
                Deslogar
              </button>
            ) : (
              <Link
                href="/login"
                className="px-3 hover:text-green-800"
                onClick={() => setMenuActive(false)}
              >
                Logar
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
