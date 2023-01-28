import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    push: () => { },
    pathname: '/'
  })),
}))

vi.mock('next/link', () => ({
  default: ({ children }) => {
    return children
  },
}))

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: {
      user: {
        _id: 'id',
        email: 'test@test.test',
        profiles: []
      },
    },
    actual: {},
  })),
  getSession: vi.fn(() => ({

    user: {
      _id: 'id',
      email: 'test@test.test',
      profiles: []
    },

    actual: {},
  })),
}))

vi.mock('pusher-js', () => ({
  default: require('pusher-js-mock').PusherMock,
}))

class MockPushClient {

  constructor() { }
  start() {
  }
  addDeviceInterest() {
  }
  removeDeviceInterest() {
  }
  getDeviceInterests() {
  }
  setSubscriptions() {
  }
  getSubscriptions() {
  }
  getSubscriptionState() {
  }
  stop() {
  }
  clearAllState() {
  }
}
vi.mock('@pusher/push-notifications-web', () => ({

  Client: MockPushClient,
  beamsClient: {
    start: () => { },
  }
}))

vi.mock('dayjs', () => {
  const dayjs = require('dayjs'),
    relativeTime = require('dayjs/plugin/relativeTime'),
    localizedFormat = require('dayjs/plugin/localizedFormat'),
    fr = require('dayjs/locale/fr');
  dayjs.extend(relativeTime)
  dayjs.extend(localizedFormat)
  dayjs.locale(fr)
  return {

    default: dayjs
  }
})
