import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react"
import { ProfilesName } from '../../types/Profile.interface';
import { ProfilAccess } from '../../utils/ProfilAccess';
import { prisma } from '../../db/db';

export default async function getUsers(req: NextApiRequest, res: NextApiResponse){

  const session = await getSession({ req })
  if(!session || req.method !== 'POST') return res.status(403).send('Wrong Method or unknow user');

  const 
    {take,search,leagues,cursor} = req.body,
    isAdmin = ProfilAccess([ProfilesName.bureau,ProfilesName.coach,ProfilesName.superadmin],session.user.profiles)

  const options: {
    where?: Object;
    take: number;
    cursor?: Object;
    skip?: number;
    select?: object;
    include?: object;
  } = {
    take: take || 25,
    include: {
      leagues: {
        select: {
          league: true,
        },
      },
    },
  };

  if (!isAdmin) {
    const { leagues } = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        leagues: {
          select: { leagueId: true },
        },
      },
    });

    options.where = {
      ...options.where,
      leagues: {
        some: {
          leagueId: {
            in: leagues.map((o: { leagueId: number }) => o.leagueId),
          },
        },
      },
    };
  }

  if (search) {
    options.where = {
      ...options.where,
      OR: [
        {
          email: {
            contains: search,
          },
        },
        {
          name: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
          },
        },
        {
          derbyName: {
            contains: search,
          },
        },
      ],
    };
  }

  if(leagues && leagues.length !== 0){
    options.where = {
      ...options.where,
      leagues: {
        some: {
          leagueId: {
            in: leagues,
          },
        },
      },
    }
  }
  
  if (cursor) {
    options.skip = 1;
    options.cursor = {
      id: cursor,
    };
  }

  const 
    users = await prisma.user.findMany(options),
    response: { users: Array<any>; cursor?: number } = {
      users,
    };

  if (users.length === take) {
    const lastUser:any = users[users.length -1];
    response.cursor = lastUser.id;
  }
  res.send(response)
} 