import type { NavigateOptions } from 'react-router'

export type AppRouteItem = {
  pathname: string
  options?: NavigateOptions
}

const APP_ROUTES = {
  HOME: {
    pathname: '/'
  } as AppRouteItem,

  MEDICINE_LIST: {
    pathname: '/medicine-list'
  } as AppRouteItem,

  ANY: {
    pathname: '*'
  } as AppRouteItem,

  SOMETHING_WENT_WRONG: {
    pathname: '/something-went-wrong'
  } as AppRouteItem
}

export default APP_ROUTES
