import { afterEach, describe, expect, it, vi } from 'vitest'
import {  cleanup,  waitFor, fireEvent } from '@testing-library/react';
import { server } from '../../../setupFiles/server'
import { rest } from 'msw'
import { render } from '../../../utils/test-utils'
import { PusherContext } from '../../../stores/pusher.store'
import MyAvatarWithPopin from './MyAvatarWithPopin';

describe('<MyAvatarWithPopin />', () => {
  afterEach(cleanup)

  server.use(
    rest.post('/api/users/avatar', (_req, res, ctx) => {

      return res(ctx.status(200), ctx.text('url-avatar'))
    }),
  );
  it('trigger close',async  () => {
    const mockOnclose = vi.fn()

    const {getByTestId } = render(
      <PusherContext.Provider value={[null, vi.fn]}>
        <MyAvatarWithPopin onClose={mockOnclose}/>
      </PusherContext.Provider>
    )

    fireEvent.click(getByTestId('avatar'));
    waitFor(()=>expect( getByTestId('avatar-cross')).toBeInTheDocument()) 
    fireEvent.click(getByTestId('avatar'));
    waitFor(()=>expect(mockOnclose).toHaveBeenCalled()) 
    
  })
})
