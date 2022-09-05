import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, cleanup, renderHook, act } from '@testing-library/react'
import UserCard from './UserCard'
import useUserCard from './useUserCard'

describe('<UserCard />', () => {
  afterEach(cleanup)

  const mockUser = {
    _id: 'id',
    email: 'on@ok.fr',
    name: 'name',
    lastname: 'lastname',
    leagues: ['league', 'league 2'],
    teams:[]
  }

  it('Check snapshot', () => {
    const { asFragment } = render(
      <UserCard user={mockUser} openPopin={vi.fn} url='url'/>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('Test handleClick', () => {
    const triggerOpenPopin = vi.fn(),
      { result } = renderHook(() => useUserCard(mockUser, triggerOpenPopin, 'url'))

    act(() => {
      result.current()
    })

    expect(triggerOpenPopin).toBeCalledWith(mockUser)
  })
})