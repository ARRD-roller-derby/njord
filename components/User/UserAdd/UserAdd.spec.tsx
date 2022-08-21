import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, cleanup, renderHook, act } from '@testing-library/react'
import UserAdd from './UserAdd'
import useUserAdd from './useUserAdd'

describe('<UserAdd />', () => {
  afterEach(cleanup)

  const mockUser = {
    _id: 'id',
    email: 'on@ok.fr',
    name: 'name',
    lastname: 'lastname',
    leagues: ['league', 'league 2'],
  }
  it('Check snapshot', () => {
    const { asFragment } = render(
      <UserAdd defaultValue="test@test.fr" openPopin={vi.fn} reSync={vi.fn} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('Test hook functions', () => {
    const triggerOpenPopin = vi.fn(),
      { result } = renderHook(() => useUserAdd(triggerOpenPopin))

    //default state
    expect(result.current.isOpen).toBeFalsy()
    //set isOpen
    act(() => {
      result.current.handleOpen()
    })
    expect(result.current.isOpen).toBeTruthy()
    
    //check if openPopin is called
    act(() => {
      result.current.handleClose(mockUser)
    })
    expect(triggerOpenPopin).toBeCalled()
    expect(result.current.isOpen).toBeFalsy()
  })
})
