const routesPath = {
  root: '/',
  notfound: '/notfound',
  login: '/login',
  home: '/home',
  free: '/free'
}

const noAuthenRoutes = [
  {
    path: routesPath.login,
    exact: true,
    component: 'login'
  },
  {
    path: routesPath.free,
    exact: true,
    component: 'free'
  }
]

const authenRoutes = [
  {
    path: routesPath.home,
    exact: true,
    component: 'home'
  },
  {
    path: routesPath.root,
    exact: true,
    component: 'root'
  }
]

const freeRoutes = [
  {
    path: routesPath.free,
    exact: true,
    component: 'free'
  }
]

export { routesPath, noAuthenRoutes, authenRoutes, freeRoutes }
