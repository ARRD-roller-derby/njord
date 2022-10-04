import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import Profile from './Profile'
import { render, screen } from '../../../utils/test-utils'
import { SocketContext } from '../../../stores/socket.store'

describe('<Profile />', () => {
  afterEach(cleanup)

  it('Check snapshot', async () => {
    const { asFragment } = render(
      <SocketContext.Provider value={[null, vi.fn]}>
        <Profile/>
      </SocketContext.Provider>
    )
    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
