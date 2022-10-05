import { afterEach,describe,expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import League from './League'
import { render, screen } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'
import { SocketContext } from '../../../stores/socket.store'

describe('<League />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/requests/league/pending', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.text('Vous avez une demande en attente'))
    }),
    rest.post('/api/leagues/leagues', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    })
  );

  it('Check snapshot', async () => {
    const {asFragment } = render(
      <SocketContext.Provider value={[null, vi.fn]}>
        <League/>
      </SocketContext.Provider>
    )

    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(await screen.findByText("Vous n'avez pas de league")).toBeInTheDocument()
    
    expect(asFragment()).toMatchSnapshot()
    
  })
})
