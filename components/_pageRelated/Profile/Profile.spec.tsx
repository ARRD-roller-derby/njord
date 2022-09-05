import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import Profile from './Profile'
import { PusherContext } from '../../../stores/pusher.store'
import { render, screen } from '../../../utils/test-utils'

describe('<Profile />', () => {
  afterEach(cleanup)

  it('Check snapshot', async () => {
    const { asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <Profile/>
      </PusherContext.Provider>
    )
    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
