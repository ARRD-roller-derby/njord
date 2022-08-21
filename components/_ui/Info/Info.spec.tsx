import { afterEach, describe, expect, it } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import Info from './Info'

describe('<FlexCol />', () => {
  afterEach(cleanup)

  it('Check snapshot', () => {
    const { asFragment } = render(
      <Info>
        <p>test</p>
        <p>test 2</p>
      </Info>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
