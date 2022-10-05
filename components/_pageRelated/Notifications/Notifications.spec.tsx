import {describe,expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import Notifications from './Notifications'
import { render, screen } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'
import { SocketContext } from '../../../stores/socket.store'

describe('<Notifications />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/notifications/notifications', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    }),
    rest.post('/api/requests/requests', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    }),

  );

  it('Check snapshot', async () => {
    const {asFragment } = render(
      <SocketContext.Provider value={[null, vi.fn]}>
        <Notifications/>
      </SocketContext.Provider>
    )
    expect(await screen.findByText('Aucune notification')).toBeInTheDocument()
    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
    
  })
})
