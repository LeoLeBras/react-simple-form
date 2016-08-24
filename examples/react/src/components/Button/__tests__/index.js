/* eslint padded-blocks: 0 */

import React from 'react'
import renderer from 'react-test-renderer'
import Button from './../'

describe('<Button /> component', () => {

  it('renders correctly', () => {
    const instance = renderer.create(
      <Button onClick={() => null}>
        Submit
      </Button>
    ).toJSON()
    expect(instance).toMatchSnapshot()
  })

})
