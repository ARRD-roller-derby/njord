import { afterEach, describe, expect, it, vi } from 'vitest'
import {cleanup } from '@testing-library/react'
import Home from './Home'
import { PusherContext } from '../../../stores/pusher.store'
import { render, screen } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'

describe('<Home />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/events/next', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    })
  );

  it('Check snapshot', async () => {
    const { asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <Home/>
      </PusherContext.Provider>
    )
    
    expect(await screen.findByText('Aucun événement prévu.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})


