import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { render } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'
import { SocketContext } from '../../../stores/socket.store'
import { Sponsors } from './sponsors'

describe('<Sponsors />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/sponsors/sponsors', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ articles: [], totalPage: 0, page: 1 }))
    })
  );

  it('Check snapshot', async () => {
    const { asFragment } = render(
      <SocketContext.Provider value={[null, vi.fn]}>
        <Sponsors />
      </SocketContext.Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
