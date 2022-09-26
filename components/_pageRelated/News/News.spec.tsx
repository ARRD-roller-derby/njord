import { afterEach,describe,expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import News from './News'
import { PusherContext } from '../../../stores/pusher.store'
import { render } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'

describe('<News />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/news/news', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({articles:[],totalPage:0,page:1}))
    })
  );

  it('Check snapshot', async () => {
    const {asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <News/>
      </PusherContext.Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
