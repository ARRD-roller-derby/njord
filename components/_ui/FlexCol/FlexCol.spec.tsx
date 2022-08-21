import { afterEach, describe, expect, it } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import FlexCol from './FlexCol'

describe('<FlexCol />', () => {
  afterEach(cleanup)

  it('Check snapshot', () => {
    const { asFragment } = render(
      <FlexCol>
        <p>test</p>
        <p>test 2</p>
      </FlexCol>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
