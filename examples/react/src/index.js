/* eslint global-require: 0 */
/* eslint import/newline-after-import: 0 */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import FormExample from './FormExample'

const $app = document.querySelector('.app')

ReactDOM.render(<FormExample />, $app)

if (module.hot) {
  module.hot.accept('./FormExample', () => {
    const RedBox = require('redbox-react').default
    const NextFormExample = require('./FormExample').default
    try {
      ReactDOM.render(
        <AppContainer>
          <NextFormExample />
        </AppContainer>,
        $app
      )
    } catch (e) {
      ReactDOM.render(<RedBox error={e} />, $app)
    }
  })
}
