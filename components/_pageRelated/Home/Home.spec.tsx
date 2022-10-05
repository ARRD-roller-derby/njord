import { afterEach, describe, expect, it, vi } from 'vitest'
import {cleanup } from '@testing-library/react'
import Home from './Home'
import { render, screen } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'
import { SocketContext } from '../../../stores/socket.store'

describe('<Home />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/events/next', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    })
  );

  it('Check snapshot', async () => {
    const { asFragment } = render(
      <SocketContext.Provider value={[null, vi.fn]}>
        <Home/>
      </SocketContext.Provider>
    )
    
    expect(await screen.findByText('Aucun événement prévu.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})


