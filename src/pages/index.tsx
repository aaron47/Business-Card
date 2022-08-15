import type { Session } from 'next-auth';
import { signIn, signOut, getSession, GetSessionParams } from 'next-auth/react';
import { PrismaClient, Profile } from '@prisma/client';
import CreateProfile from '../components/CreateProfile';
import { NextPage } from 'next';
import DisplayProfile from '../components/DisplayProfile';
import { useState } from 'react';
import EditProfile from '../components/EditProfile';

interface Props {
  session: Session | null;
  profile: Profile | null;
}

const Home: NextPage<Props> = ({ session, profile }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {!profile && <CreateProfile />}
        {profile && !isEditing && (
          <div className="flex flex-col justify-center">
            <DisplayProfile profile={profile} />
            <button
              className="bg-indigo-700 text-white rounded-md px-4 py-2 hover:bg-indigo-600 mt-3 max-w-sm mx-auto"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
        {profile && isEditing && (
          <EditProfile profile={profile} setIsEditing={setIsEditing} />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <>
        Not Signed In <br /> <button onClick={() => signIn()}>Sign In</button>
      </>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetSessionParams | undefined
) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  const profile = await prisma.profile.findUnique({
    where: {
      email: session!.user!.email!,
    },
    select: {
      name: true,
      email: true,
      twitter: true,
      slug: true,
      facebook: true,
      instagram: true,
      phone: true,
      bio: true,
    },
  });

  console.log('profile', profile);

  return {
    props: {
      session,
      profile,
    },
  };
};
