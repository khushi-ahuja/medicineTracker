import type { ComponentType } from 'react'
import { lazy, Suspense } from 'react'
import type { LoaderFunction, LoaderFunctionArgs } from 'react-router'

export const lazyLoadPage = (
  importer: () => Promise<{ default: ComponentType }>,
  key: string,
  Fallback?: ComponentType
) => {
  const Page = lazy(importer)
  const lazyPage = Fallback ? (
    <Suspense fallback={<Fallback />} key={key}>
      <Page />
    </Suspense>
  ) : (
    <Page />
  )

  return lazyPage
}

export const lazyLoadLoader =
  (importer?: () => Promise<{ loader: LoaderFunction }>) =>
  async (args: LoaderFunctionArgs) => {
    if (importer) {
      const { loader } = await importer()
      return loader(args)
    }
  }
