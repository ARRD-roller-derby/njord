import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import ViewRequest from './ViewRequest'
import { PusherContext } from '../../../stores/pusher.store'
import { render, screen } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'

describe('<ViewRequest />', () => {
  afterEach(cleanup)
  server.use(
    rest.post('/api/requests/request', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          _id:  'request_id',
          userId: 'user_id',
          type: 'league_join',
          token:'token',
          resume: 'njord@njord.fr veut rejoindre la league NJORD',
          value: {
            shortName: 'NJORD',
            leagueId:  'id' ,
            name: 'njord@njord.fr',
          },
          updatedAt: '2022-08-11T19:52:07.782+00:00',
        })
      )
    })
  )

  it('Check snapshot', async () => {
    const { asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <ViewRequest token={'token'} />
      </PusherContext.Provider>
    )

    expect(
      await screen.findByText('njord@njord.fr veut rejoindre la league NJORD')
    ).toBeInTheDocument()
    expect(await screen.findByText('200 Dr.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
