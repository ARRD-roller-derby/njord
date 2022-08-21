import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import Membre from './Membre'
import { PusherContext } from '../../../stores/pusher.store'
import { render, screen } from '../../../utils/test-utils'

describe('<Membre />', () => {
  afterEach(cleanup)

  it('Check snapshot', async () => {

    const { asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <Membre id={'id'} />
      </PusherContext.Provider>
    )
    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
