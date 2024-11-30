import { createProduct, getProduct, updateProduct } from '@/data/products'
import { editProductSchema } from '@/schemas/product'
import {
  EditProductData,
  EditProductDataErrors,
  EditProductType,
} from '@/types/products'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { SpinLoader } from './SpinLoader'

const initialData: EditProductData = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
}

const initialErrors: EditProductDataErrors = {
  title: [],
  price: [],
  description: [],
  category: [],
  image: [],
}

export const EditProduct: EditProductType = ({ editing }) => {
  const [product, setProduct] = useState<EditProductData>(initialData)
  const [productErrors, setProductErrors] =
    useState<EditProductDataErrors>(initialErrors)

  const [loading, setLoading] = useState<boolean>(true)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        const result = await getProduct(Number(id))

        if (result.success) {
          setProduct({
            title: result.product.title,
            category: result.product.category,
            image: result.product.image,
            description: result.product.description,
            price: result.product.price,
          })
        } else {
          toast.error('Erro ao buscar dados')
        }

        setLoading(false)
      }
    }

    if (editing && id) fetchProductData()
    else setLoading(false)
  }, [editing, searchParams, id])

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validation = editProductSchema.safeParse(product)

    if (validation.success) {
      if (editing) sendDataToUpdateProduct()
      else sendDataToCreateProduct()
    } else {
      setProductErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      })
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setProductErrors((prevState) => ({
      ...prevState,
      [name]: [],
    }))

    if (name !== 'price') {
      setProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    } else if (name === 'price') {
      setProduct((prevState) => ({
        ...prevState,
        price: Number(value),
      }))
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    setProductErrors((prevState) => ({
      ...prevState,
      image: [],
    }))

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProduct((prevState) => ({
        ...prevState,
        image: imageUrl,
      }))
    }
  }

  const sendDataToCreateProduct = async () => {
    const response = await createProduct(product)

    if (response.success) {
      toast.success('Produto criado')
      setProduct(initialData)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } else {
      toast.error('Não foi possível criar o produto')
    }
  }

  const sendDataToUpdateProduct = async () => {
    if (id) {
      const response = await updateProduct(Number(id), product)

      if (response.success) {
        toast.success('Produto Atualizado com sucesso')
        setProduct(initialData)

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }

        router.push('/produtos')
      } else {
        toast.error('Não foi possível atualizar o produto')
      }
    }
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
              <span className="mb-1 text-lg font-medium text-gray-700">
                Título
              </span>
              <input
                type="text"
                placeholder="Informe o título"
                className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  productErrors.title.length > 0
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                onChange={handleInputChange}
                name="title"
                value={product.title}
              />
              {productErrors.title.length > 0 &&
                productErrors.title.map((error, index) => (
                  <small key={index} className="text-red-500 mt-1 text-sm">
                    {error}
                  </small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-lg font-medium text-gray-700">
                Preço
              </span>
              <input
                type="number"
                placeholder="Informe o preço"
                className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  productErrors.price.length > 0
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                onChange={handleInputChange}
                name="price"
                value={product.price}
              />
              {productErrors.price.length > 0 &&
                productErrors.price.map((error, index) => (
                  <small key={index} className="text-red-500 mt-1 text-sm">
                    {error}
                  </small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-lg font-medium text-gray-700">
                Descrição
              </span>
              <input
                type="text"
                placeholder="Informe a descrição"
                className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  productErrors.description.length > 0
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                onChange={handleInputChange}
                name="description"
                value={product.description}
              />
              {productErrors.description.length > 0 &&
                productErrors.description.map((error, index) => (
                  <small key={index} className="text-red-500 mt-1 text-sm">
                    {error}
                  </small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-lg font-medium text-gray-700">
                Categoria
              </span>
              <input
                type="text"
                placeholder="Informe a categoria"
                className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  productErrors.category.length > 0
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                onChange={handleInputChange}
                name="category"
                value={product.category}
              />
              {productErrors.category.length > 0 &&
                productErrors.category.map((error, index) => (
                  <small key={index} className="text-red-500 mt-1 text-sm">
                    {error}
                  </small>
                ))}
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-lg font-medium text-gray-700">
                Imagem
              </span>
              <input
                type="file"
                accept="image/*"
                className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  productErrors.image.length > 0
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                onChange={handleImageChange}
                name="image"
                ref={fileInputRef}
              />
              {productErrors.image.length > 0 &&
                productErrors.image.map((error, index) => (
                  <small key={index} className="text-red-500 mt-1 text-sm">
                    {error}
                  </small>
                ))}
            </label>

            <button
              className="rounded-md bg-green-900 px-4 py-2 text-lg font-semibold text-white transition hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-green-900"
              type="submit"
            >
              {editing ? 'Editar produto' : 'Criar novo produto'}
            </button>
          </div>
        </form>
      )}
    </>
  )
}
