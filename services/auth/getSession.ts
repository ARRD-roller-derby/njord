import {prisma} from '../../db/db';
export default async function getSessionWithProfile({ session, token, user }){
  if(token && session){
    session.accessToken = token.accessToken
  }
  const userForSession = await prisma.user.findUnique({
    where: {
      id:user.id
    },
    include:{
      profiles:{
        select:{
          profile:true
        }
      },
      leagues:{select: {
        league: true,
      },
    }
    }
  })
  session.user = userForSession
  return session
}