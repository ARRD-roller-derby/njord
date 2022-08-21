import { afterEach, describe, expect, it } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import Verify from './Verify'

describe('<Verify />', () => {
  afterEach(cleanup)

  it('Check snapshot', () => {
    //Catch les requêtes/

    const { asFragment } = render(<Verify />)
    expect(asFragment()).toMatchSnapshot()
  })
})
