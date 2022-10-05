import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { render, screen } from '../../../utils/test-utils'
import Event from './Event'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'
import { SocketContext } from '../../../stores/socket.store';

describe('<Event />', () => {
  afterEach(cleanup)

  server.use(
    rest.post('/api/event/event', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    })
  );

  it('Check snapshot', async () => {

    const { asFragment } = render(
      <SocketContext.Provider value={[null, vi.fn]}>
        <Event id={'id'} />
      </SocketContext.Provider>
    )
    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
