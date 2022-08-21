import { afterEach, describe, expect, it } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import MenuDesktop from './MenuDesktop'

describe('<Menu />', () => {
  afterEach(cleanup)

  it('Check snapshot', () => {
    const { asFragment } = render(<MenuDesktop />)
    expect(asFragment()).toMatchSnapshot()
  })
})
