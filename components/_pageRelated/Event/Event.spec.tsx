import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { PusherContext } from '../../../stores/pusher.store'
import { render, screen } from '../../../utils/test-utils'
import Event from './Event'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'

describe('<Event />', () => {
  afterEach(cleanup)

  server.use(
    rest.post('/api/event/event', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    })
  );

  it('Check snapshot', async () => {

    const { asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <Event id={'id'} />
      </PusherContext.Provider>
    )
    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
