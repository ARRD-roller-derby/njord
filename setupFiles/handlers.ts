import { rest } from 'msw'

export const handlers = [
  rest.get('/api/auth/session', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          _id: 'idtest',
          email: 'test@test.fr',
          emailVerified: '2022-08-04T22:31:56.765Z',
          profiles: ['admin'],
          allergies: [],
          name: 'Benoist',
          lastname: 'Bouteiller',
          derbyName: 'Enrico Motion',
          numRoster: '95',
          admin: true,
          teams: [],
          wallet: 200,
        },
        expires: '2022-09-04T13:44:07.190Z',
        isAdmin: true,
      })
    )
  }),
  rest.post('/api/notifications/notifications', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
  rest.post('/api/notifications/count', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.text('10'))
  }),
  rest.post('/api/requests/requests', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
  rest.post('/api/users/wallet', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.text('200'))
  }),
  rest.post('/api/users/avatar', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json('/public/static/images/profile.webp'))
  }),
  rest.post('/api/league/users', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
  rest.post('/api/users/me', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      email: 'email@email.email',
      name:'name',
      lastname:'lastname'
    }))
  }),
]
