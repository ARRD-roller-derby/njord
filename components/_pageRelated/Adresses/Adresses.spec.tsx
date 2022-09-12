import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import Adresses from './Adresses'
import { PusherContext } from '../../../stores/pusher.store'
import { render, screen } from '../../../utils/test-utils'
import { rest } from 'msw'
import { server } from '../../../setupFiles/server'

describe('<Adresses />', () => {
  
  afterEach(cleanup)
  server.use(
    rest.post('/api/addresses/addresses', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    })
  )

  it('Check snapshot', async () => {
    const { asFragment } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <Adresses />
      </PusherContext.Provider>
    )

    expect(await screen.findByText('Aucune adresse.')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
