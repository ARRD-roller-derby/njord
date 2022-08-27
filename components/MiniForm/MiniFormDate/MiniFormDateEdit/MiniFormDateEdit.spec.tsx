import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, cleanup, renderHook, act } from '@testing-library/react'
import useMiniFormDateEdit from './useMiniFormDateEdit';
import MiniFormDateEdit from './MiniFormDateEdit';
import dayjs from 'dayjs';

describe('<MiniFormDate />', () => {
  afterEach(cleanup)

  it('Check snapshot', () => {
    const { asFragment } = render(
      <MiniFormDateEdit setValue={vi.fn} value='2021-12-31' />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('Test hook functions', () => {
    const 
      setValueMock=vi.fn(),
      { result } = renderHook(() => useMiniFormDateEdit(dayjs('01/01/2022').toDate(),setValueMock))

    act(() => {
      result.current.setAllState({label:'date State',value:'02'})
    })
    expect(setValueMock).toBeCalledWith('02')
    
  })
})
