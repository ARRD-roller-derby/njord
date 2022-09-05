import {describe,expect, it} from 'vitest'
import { cleanup } from '@testing-library/react'
import ErrorMsg from './ErrorMsg'
import { render, screen } from '../../../utils/test-utils'

describe('<ErrorMsg />', () => {
  afterEach(cleanup)

  it('Check snapshot', async () => {
    const {asFragment } = render(
        <ErrorMsg message='erreur'/>
    )

    expect(await screen.findByText('erreur')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
