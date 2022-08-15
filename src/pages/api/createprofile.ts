import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { createProfileInput } from '../../schemas/profile.schema';

const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const {
      name,
      bio,
      phone,
      twitter,
      facebook,
      instagram,
      slug,
    }: createProfileInput = req.body;

    const profile = await prisma.profile.create({
      data: {
        name,
        slug,
        bio,
        phone,
        email: session!.user!.email!,
        facebook,
        twitter,
        instagram,
        user: {
          connect: { email: session!.user!.email! },
        },
      },
    });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
