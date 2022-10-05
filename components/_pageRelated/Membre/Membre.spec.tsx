import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import Membre from './Membre'
import { render, screen } from '../../../utils/test-utils'
import { SocketContext } from '../../../stores/socket.store'

describe('<Membre />', () => {
  afterEach(cleanup)

  it('Check snapshot', async () => {

    const { asFragment } = render(
      <SocketContext.Provider value={[null, vi.fn]}>
        <Membre id={'id'} />
      </SocketContext.Provider>
    )
    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
