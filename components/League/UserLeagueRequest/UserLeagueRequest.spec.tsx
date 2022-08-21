import { afterEach, describe, expect, it } from 'vitest'
import { render, cleanup} from '@testing-library/react'
import UserLeagueRequest from './UserLeagueRequest'

describe('<UserLeagueRequest />', () => {
  afterEach(cleanup)

  it('Check snapshot', () => {
    const { asFragment } = render(
      <UserLeagueRequest />
    )
    expect(asFragment()).toMatchSnapshot()
  })

})
