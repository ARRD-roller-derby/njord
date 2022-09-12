import { vi } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {},
    pathname:'/'
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
        profiles:[]
      },
    },
    actual: {},
  })),
}))

vi.mock('pusher-js', () => ({
  default: require('pusher-js-mock').PusherMock,
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
}})

mongod = await MongoMemoryServer.create({ binary: { version: '8.9.1' } });