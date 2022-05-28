import {prisma} from '../../db/db';
export default async function getSessionWithProfile({ session, token, user }){
  //TODO inject in session profiles... 
  if(token && session){
    session.accessToken = token.accessToken
  }
  const userForSession = await prisma.user.findUnique({
    where: {
      id:user.id
    },
    include:{
      profiles:true,
      leagues:true,
    }
  })
  console.log(session)
  session.user = userForSession
  return session
}