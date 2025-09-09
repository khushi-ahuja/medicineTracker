import type { FC } from 'react'
import { Suspense, useId } from 'react'
import { RouterProvider } from 'react-router/dom'

import getAppRouter from './Configration/getAppRouter'

import Loader from './Components/Loader'

let router: ReturnType<typeof getAppRouter> | undefined
let key: string | undefined

const AppRouter: FC = () => {
  if (!router) {
    router = getAppRouter()

    if (!key) {
      key = useId()
    }
  }

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} key={key} />
    </Suspense>
  )
}
export default AppRouter
