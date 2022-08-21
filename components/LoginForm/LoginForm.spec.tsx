import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, cleanup, renderHook, act } from '@testing-library/react'
import LoginForm from './LoginForm'
import useLoginForm from './useLoginForm'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'

describe('<LoginForm />', () => {
  afterEach(cleanup)

  vi.mock('next-auth/react', () => {
    const signIn = vi.fn(() => ({
      someMethod: vi.fn(),
    }))
    return { signIn }
  })

  vi.mock('react-toastify', () => {
    const toast = {
      error: vi.fn(),
    }
    return { toast }
  })

  it('Check snapshot', () => {
    const { asFragment } = render(<LoginForm />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Send an email', () => {
    const { result } = renderHook(() => useLoginForm())

    act(() => {
      result.current.setEmail('my email')
    })
    act(() => {
      result.current.submit()
    })
    expect(signIn).toHaveBeenCalledWith('email', { email: 'my email' })
  })

  it('No type email', () => {
    const { result } = renderHook(() => useLoginForm())
    act(() => {
      result.current.submit()
    })
    expect(toast.error).toHaveBeenCalledWith(
      'Il faut renseigner un email valide.'
    )
  })
})
