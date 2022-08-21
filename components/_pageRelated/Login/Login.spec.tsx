import { afterEach, describe, expect, it } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import Login from './Login'

describe('<Login />', () => {
  afterEach(cleanup)

  it('Check snapshot', () => {
    //Catch les requêtes/

    const { asFragment } = render(<Login />)
    expect(asFragment()).toMatchSnapshot()
  })
})
