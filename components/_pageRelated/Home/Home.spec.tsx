import { afterEach, describe, expect, it, vi } from 'vitest'
import {cleanup } from '@testing-library/react'
import Home from './Home'
import { PusherContext } from '../../../stores/pusher.store'
import { render, screen } from '../../../utils/test-utils'

describe('<Home />', () => {
  afterEach(cleanup)

  it('Check snapshot', async () => {
    const { asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <Home/>
      </PusherContext.Provider>
    )
    
    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
