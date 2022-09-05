import { afterEach, describe, expect, it } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import LeagueRequest from './LeagueRequest'

describe('<LeagueRequest />', () => {
  afterEach(cleanup)

  it('Check snapshot', () => {
    const { asFragment } = render(
      <LeagueRequest canIRequest={false} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

})
