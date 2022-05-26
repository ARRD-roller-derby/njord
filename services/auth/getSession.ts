export default function getSessionWithProfile({ session, token, user }){
  console.log('ON PEUX ADD DES TRUCS Là ? ',token)
  if(token){
    session.accessToken = token.accessToken

  }

  session.profiles = 'mon profile'
  return session
}