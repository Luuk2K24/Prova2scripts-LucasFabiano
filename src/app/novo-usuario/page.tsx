import { Suspense } from 'react'
import { NewUserSection } from './NewUserSection'
import { SpinLoader } from '@/components/SpinLoader'

export default function NewUser() {
  return (
    <main className="mx-auto mt-16 min-h-screen-header max-w-1440px px-4 py-2 md:px-8 lg:px-10">
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center">
            <SpinLoader />
          </div>
        }
      >
        <NewUserSection />
      </Suspense>
    </main>
  )
}
