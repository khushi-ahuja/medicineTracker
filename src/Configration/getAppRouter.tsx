import type { RouteObject } from 'react-router'
import { createBrowserRouter } from 'react-router'

// import ErrorBoundary from '~/src/Layouts/ErrorBoundary'

import APP_ROUTES from '../Constants/APP_ROUTES'

import Loader from '../Components/Loader'
import { lazyLoadPage, lazyLoadLoader } from '../Helpers/Route.Helpers'

// Layouts
const MainLayout = lazyLoadPage(
  () =>
    import(
      /* webpackChunkName: "MainLayout" */
      '../Layouts/Main.Layout'
    ),
  'MainLayout'
)

// const ErrorLayout = lazyLoadPage(
//   () =>
//     import(
//       /* webpackChunkName: "ErrorLayout" */
//       '~/src/Layouts/Error.Layout'
//     ),
//   'ErrorLayout'
// )

// Pages & Loaders

// Home
const HomeLoader = lazyLoadLoader(
  () => import(/* webpackChunkName: "HomeLoader" */ '../Pages/Home/Home.Loader')
)

const HomePage = lazyLoadPage(
  () => import(/* webpackChunkName: "HomePage" */ '../Pages/Home/Home.Page'),
  'HomePage'
)

// About
// const AboutLoader = validatePublicRouteLoader(
//   () =>
//     import(
//       /* webpackChunkName: "AboutLoader" */ '~/src/Pages/About/About.Loader'
//     )
// )

// const AboutPage = lazyLoadPage(
//   () =>
//     import(/* webpackChunkName: "AboutPage" */ '~/src/Pages/About/About.Page'),
//   'AboutPage'
// )

// // NotFound
// const NotFoundLoader = lazyLoadLoader(
//   () =>
//     import(
//       /* webpackChunkName: "NotFoundLoader" */ '~/src/Pages/NotFound/NotFound.Loader'
//     )
// )

// const NotFoundPage = lazyLoadPage(
//   () =>
//     import(
//       /* webpackChunkName: "NotFoundPage" */ '~/src/Pages/NotFound/NotFound.Page'
//     ),
//   'NotFoundPage'
// )

// // SomethingWentWrong
// const SomethingWentWrongLoader = lazyLoadLoader(
//   () =>
//     import(
//       /* webpackChunkName: "SomethingWentWrongLoader" */ '~/src/Pages/SomethingWentWrong/SomethingWentWrong.Loader'
//     )
// )

// const SomethingWentWrongPage = lazyLoadPage(
//   () =>
//     import(
//       /* webpackChunkName: "SomethingWentWrongPage" */ '~/src/Pages/SomethingWentWrong/SomethingWentWrong.Page'
//     ),
//   'SomethingWentWrongPage'
// )

// // UnsupportedBrowsers
// const UnsupportedBrowsersLoader = lazyLoadLoader(
//   () =>
//     import(
//       /* webpackChunkName: "UnsupportedBrowsersLoader" */ '~/src/Pages/UnsupportedBrowsers/UnsupportedBrowsers.Loader'
//     )
// )

// const UnsupportedBrowsersPage = lazyLoadPage(
//   () =>
//     import(
//       /* webpackChunkName: "UnsupportedBrowsersPage" */ '~/src/Pages/UnsupportedBrowsers/UnsupportedBrowsers.Page'
//     ),
//   'UnsupportedBrowsersPage'
// )

const routeObj: RouteObject[] = [
  {
    element: MainLayout,
    HydrateFallback: Loader,
    // errorElement: <ErrorBoundary />,
    children: [
      {
        path: APP_ROUTES.HOME.pathname,
        loader: HomeLoader,
        element: HomePage
      }
    ]
  }
  // {
  //   element: ErrorLayout,
  //   HydrateFallback: Loader,
  //   errorElement: <ErrorBoundary />,
  //   children: [
  //     {
  //       path: APP_ROUTES.ANY.pathname,
  //       loader: NotFoundLoader,
  //       element: NotFoundPage
  //     },
  //     {
  //       path: APP_ROUTES.SOMETHING_WENT_WRONG.pathname,
  //       loader: SomethingWentWrongLoader,
  //       element: SomethingWentWrongPage
  //     },
  //     {
  //       path: APP_ROUTES.UNSUPPORTED_BROWSERS.pathname,
  //       loader: UnsupportedBrowsersLoader,
  //       element: UnsupportedBrowsersPage
  //     }
  //   ]
  // }
]

const getAppRouter = () => createBrowserRouter(routeObj)

export default getAppRouter
