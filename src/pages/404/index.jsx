import React from 'react'

import './index.less'

class NotFound extends React.PureComponent {
  render() {
    return (
      <div className='page404'>
        <div id='notfound'>
          <div className='notfound'>
            <div>
              <div className='notfound-404'>
                <h1>!</h1>
              </div>
              <h2>
                Error
                <br />
                404
              </h2>
            </div>
            <p>
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound
