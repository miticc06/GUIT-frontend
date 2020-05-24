import React from 'react'
import { inject, observer } from 'mobx-react'
import { Skeleton } from 'antd'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { ErrorBoundary } from '@components'
import { noAuthenRoutes, authenRoutes, routesPath, freeRoutes } from '@routers'
import NotFound from '@pages/404'
export * from './routes'

export const RouterComponent = inject(({ stores }) => ({
  globalState: stores.globalState
}))(
  observer(props => {
    const { globalState } = props

    return (
      <Router basename='/'>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary fallback={<NotFound />}>
            <Switch>
              {freeRoutes.map(({ component, ...routeProps }, index) => (
                <Route
                  key={index.toString()}
                  {...routeProps}
                  render={() => {
                    const Component = React.lazy(() => import(`../pages/${component}`))
                    return <Component />
                  }}
                />
              ))}

              {globalState.isAuth ? (
                <React.Suspense fallback={<Skeleton active />}>
                  {authenRoutes.map(({ component, ...routeProps }, index) => (
                    <Route
                      key={index.toString()}
                      {...routeProps}
                      render={() => {
                        const Component = React.lazy(() => import(`../pages/${component}`))
                        return <Component />
                      }}
                    />
                  ))}
                </React.Suspense>
              ) : (
                noAuthenRoutes.map(({ component, ...routeProps }, index) => (
                  <Route
                    key={index.toString()}
                    {...routeProps}
                    render={() => {
                      const Component = React.lazy(() => import(`../pages/${component}`))
                      return <Component />
                    }}
                  />
                ))
              )}

              {!globalState.isAuth && <Redirect to={routesPath.login} />}
              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
        </React.Suspense>
      </Router>
    )
  })
)
