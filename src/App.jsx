import React from 'react'
import { observer, inject } from 'mobx-react'

import { RouterComponent } from '@routers'

@inject(({ stores }) => stores)
@observer
class App extends React.PureComponent {
  render() {
    return (
      <div className='app-container'>
        <RouterComponent />
      </div>
    )
  }
}

export default App
