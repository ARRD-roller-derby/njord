import { afterEach,describe,expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import Calendar from './Calendar'
import { PusherContext } from '../../../stores/pusher.store'
import { render, screen } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'

describe('<Calendar />', () => {
  afterEach(cleanup)
  
  server.use(
    rest.post('/api/events/events', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    })
  );

  it('Check snapshot', async () => {
    const {asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <Calendar/>
      </PusherContext.Provider>
    )

    expect(await screen.findByText("lundi")).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
