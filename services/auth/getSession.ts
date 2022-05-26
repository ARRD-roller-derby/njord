export default function getSessionWithProfile({ session, token, user }){
  //TODO inject in session profiles... 
  if(token && session){
    session.accessToken = token.accessToken
  }

  return session
}