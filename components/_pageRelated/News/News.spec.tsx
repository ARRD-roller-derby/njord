import { afterEach,describe,expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import News from './News'
import { render } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'
import { SocketContext } from '../../../stores/socket.store'

describe('<News />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/news/news', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({articles:[],totalPage:0,page:1}))
    })
  );

  it('Check snapshot', async () => {
    const {asFragment } = render(
      <SocketContext.Provider value={[null, vi.fn]}>
        <News/>
      </SocketContext.Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
