import { afterEach,describe,expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import Stuff from './Stuff'
import { render, screen } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'
import { SocketContext } from '../../../stores/socket.store'

describe('<Stuff />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/items/items', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    })
  );

  it('Check snapshot', async () => {
    const {asFragment } = render(
      <SocketContext.Provider value={[null, vi.fn]}>
        <Stuff/>
      </SocketContext.Provider>
    )

    expect(await screen.findByText("Aucun objet.")).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
