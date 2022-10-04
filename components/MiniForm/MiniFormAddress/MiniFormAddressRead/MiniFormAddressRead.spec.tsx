import { afterEach,describe,expect, it, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import MiniFormAddressRead from './MiniFormAddressRead'
import { render, screen } from '../../../../utils/test-utils'
import { myAddress } from '../../../../__MOCK__/myAddress'

describe('<MiniFormAddressRead />', () => {
  afterEach(cleanup)

  it('Check snapshot', async () => {
    const {asFragment } = render(<MiniFormAddressRead/>
    )
    expect(await screen.findByText("(vide)")).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('Check snapshot with value', async () => {
    const {asFragment } = render(<MiniFormAddressRead value={myAddress}/>
    )
    expect(await screen.findByText("010101 - Gotham City")).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
