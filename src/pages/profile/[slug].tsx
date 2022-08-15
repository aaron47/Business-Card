import { PrismaClient, Profile, User } from '@prisma/client';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const profiles = await prisma.profile.findMany();
  const paths = profiles.map((profile) => ({
    params: { slug: profile.slug },
  }));

  return { paths, fallback: true };
};

function ProfilePage({
  profile,
}: {
  profile: (Profile & { user: User }) | null;
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{profile?.name}</title>
      </Head>
      <div className="text-gray-800 text-lg text-left max-w-2xl mx-auto mt-10">
        <div className="mb-10">
          <h1 className="text-2xl font-bold ">{profile?.name}</h1>
          <Image
            className="rounded-full"
            src={profile?.user?.image!}
            height={100}
            width={100}
          />
          <p>{profile?.bio}</p>
        </div>

        <ul>
          <li>
            <span className="font-bold">Email:</span> {profile?.email}
          </li>
          <li>
            {profile?.phone && (
              <>
                <span className="font-bold">Phone:</span> {profile?.phone}
              </>
            )}
          </li>
          <li>
            {profile?.twitter && (
              <>
                <span className="font-bold">Twitter:</span> {profile?.twitter}
              </>
            )}
          </li>
          <li>
            {profile?.facebook && (
              <>
                <span className="font-bold">Facebook:</span> {profile?.facebook}
              </>
            )}
          </li>
          <li>
            {profile?.instagram && (
              <>
                <span className="font-bold">Instagram:</span>{' '}
                {profile?.instagram}
              </>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProfilePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const prisma = new PrismaClient();
  const profile = await prisma.profile.findFirst({
    where: {
      slug: String(context.params!.slug),
    },
    include: {
      user: true,
    },
  });

  return {
    props: {
      profile,
    },
  };
};
