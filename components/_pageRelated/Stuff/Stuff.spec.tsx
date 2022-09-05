import { afterEach,describe,expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import Stuff from './Stuff'
import { PusherContext } from '../../../stores/pusher.store'
import { render, screen } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'

describe('<Stuff />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/items/items', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    })
  );

  it('Check snapshot', async () => {
    const {asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <Stuff/>
      </PusherContext.Provider>
    )

    expect(await screen.findByText("Aucun objet.")).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
