import { hashPass } from '@server/utils/hashPass'
import usersRouter from '..'

const PASSWORD_CORRECT = 'Password.123'

const userSeed = {
  id: 12345,
  email: 'existing@user.com',
  password: await hashPass(PASSWORD_CORRECT),
}

const db = {
  getRepository: () => ({
    findOne: ({ where: { email } }: any) =>
      email === userSeed.email ? userSeed : null,
  }),
}

const { login } = usersRouter.createCaller({ db } as any)


it.skip('returns a token if the password matches', async () => {
  const { accessToken } = await login({
    email: userSeed.email,
    password: PASSWORD_CORRECT,
  })

  expect(accessToken).toEqual(expect.any(String))
  expect(accessToken.slice(0, 3)).toEqual('eyJ')
})

it('should throw an error for non-existant user', async () => {
  await expect(
    login({
      email: 'nonexisting@user.com',
      password: PASSWORD_CORRECT,
    })
  ).rejects.toThrow()
})

it('should throw an error for incorrect password', async () => {
  expect(
    login({
      email: userSeed.email,
      password: 'password.123!',
    })
  ).rejects.toThrow(/password/i)
})

it('throws an error for invalid email', async () => {
  await expect(
    login({
      email: 'not-an-email',
      password: PASSWORD_CORRECT,
    })
  ).rejects.toThrow(/email/)
})

it('throws an error for a short password', async () => {
  await expect(
    login({
      email: userSeed.email,
      password: 'short',
    })
  ).rejects.toThrow(/password/)
})

it.skip('allows logging in with different email case', async () => {
  await expect(
    login({
      email: userSeed.email.toUpperCase(),
      password: PASSWORD_CORRECT,
    })
  ).resolves.toEqual(expect.anything())
})

it.skip('allows logging in with surrounding white space', async () => {
  await expect(
    login({
      email: ` \t ${userSeed.email}\t `,
      password: PASSWORD_CORRECT,
    })
  ).resolves.toEqual(expect.anything())
})
